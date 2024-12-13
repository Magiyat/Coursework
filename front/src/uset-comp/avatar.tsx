import { ComponentProps, FC, useState } from 'react';
import { Buffer } from 'buffer';
export const AutoAvatar: FC<ComponentProps<'img'> & { userId: any; size: number }
    > = ({ userId, size, ...imgProps }) => {
    const [base64, setBase64] = useState(undefined as string | undefined);

    // using dynamic import to save some loading
    import('jdenticon').then(({ toSvg }) => {
        const svgString = toSvg(userId, size);
        const base64 = Buffer.from(svgString).toString('base64');
        setBase64(base64);
    });

    return base64 ? (
        <div style={{ backgroundColor: 'rgba(150,163,169,0.15)', display: 'inline-block' }}>
            <img
                {...imgProps}
                src={`data:image/svg+xml;base64,${base64}`}
                alt={'User Avatar'}
            />
        </div>
    ) : (
        <div style={{ width: size, height: size, display: 'inline-block' }}>
            Loading...
        </div>
    );
};