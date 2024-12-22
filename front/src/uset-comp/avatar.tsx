import {ComponentProps, FC, useEffect, useState} from 'react';
import {Buffer} from 'buffer';

export const AutoAvatar: FC<ComponentProps<'img'> & { userId: any; size: number }> = ({userId, size, ...imgProps}) => {
    const [base64, setBase64] = useState(undefined as string | undefined);
    useEffect(() => {
        !base64 && userId !== null && import('jdenticon').then(({toSvg}) => {
            const svgString = toSvg(userId, size);
            const base64 = Buffer.from(svgString).toString('base64');
            setBase64(base64);
        });
    }, [userId, size])
    // using dynamic import to save some loading
    if (!base64) {
        return <div style={{width: size, height: size, display: 'inline-block'}} className={'loader'} />
    }
    return (
        <img
            {...imgProps}
            style={{ width: size, height: size}}
            src={`data:image/svg+xml;base64,${base64}`}
            alt={'User Avatar'}
        />
    )
};