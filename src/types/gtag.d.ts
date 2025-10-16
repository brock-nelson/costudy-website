interface Window {
  gtag: (
    command: 'config' | 'event' | 'set' | 'js',
    targetId: string,
    config?: Record<string, unknown>
  ) => void;
}
