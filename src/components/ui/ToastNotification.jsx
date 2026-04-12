import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ICONS = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const STYLES = {
    success: {
        bg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        iconBg: 'bg-white/20',
        ring: 'ring-green-400/30',
    },
    error: {
        bg: 'bg-gradient-to-r from-red-500 to-rose-500',
        iconBg: 'bg-white/20',
        ring: 'ring-red-400/30',
    },
    warning: {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
        iconBg: 'bg-white/20',
        ring: 'ring-amber-400/30',
    },
    info: {
        bg: 'bg-gradient-to-r from-blue-500 to-indigo-500',
        iconBg: 'bg-white/20',
        ring: 'ring-blue-400/30',
    },
};

/**
 * Centered popup toast notification.
 * 
 * Props:
 * - isVisible: boolean
 * - type: 'success' | 'error' | 'warning' | 'info'
 * - title: string
 * - message: string
 * - onClose: () => void
 * - duration: number (ms, default 3000, 0 = manual close only)
 */
const ToastNotification = ({ isVisible, type = 'info', title, message, onClose, duration = 3000 }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsShowing(true);
            // Trigger enter animation on next frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });

            if (duration > 0) {
                const timer = setTimeout(() => {
                    handleClose();
                }, duration);
                return () => clearTimeout(timer);
            }
        }
    }, [isVisible, duration]);

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsShowing(false);
            onClose?.();
        }, 300);
    };

    if (!isShowing) return null;

    const Icon = ICONS[type] || ICONS.info;
    const style = STYLES[type] || STYLES.info;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] pointer-events-auto transition-opacity duration-300 ${
                    isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={handleClose}
            />

            {/* Toast Card */}
            <div
                className={`
                    relative pointer-events-auto max-w-sm w-full mx-4
                    ${style.bg} rounded-2xl shadow-2xl ring-1 ${style.ring}
                    p-5 text-white
                    transition-all duration-300 ease-out
                    ${isAnimating
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-90 translate-y-4'
                    }
                `}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                    <X size={16} />
                </button>

                <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-2.5 rounded-xl ${style.iconBg} flex-shrink-0`}>
                        <Icon size={24} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-4">
                        {title && (
                            <p className="font-bold text-base leading-tight">{title}</p>
                        )}
                        {message && (
                            <p className="text-sm text-white/90 mt-1 leading-relaxed">{message}</p>
                        )}
                    </div>
                </div>

                {/* Progress bar for auto-dismiss */}
                {duration > 0 && (
                    <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white/60 rounded-full"
                            style={{
                                animation: `toast-progress ${duration}ms linear forwards`,
                            }}
                        />
                    </div>
                )}

                <style>{`
                    @keyframes toast-progress {
                        from { width: 100%; }
                        to { width: 0%; }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default ToastNotification;
