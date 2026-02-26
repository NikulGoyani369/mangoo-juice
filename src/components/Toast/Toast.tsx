interface Props {
    visible: boolean;
    message: string;
}

/** Auto-dismissing toast notification. */
export function Toast({ visible, message }: Props) {
    return (
        <div id="toast" className={visible ? 'show' : ''}>
            🥭 <span id="toast-msg">{message}</span>
        </div>
    );
}
