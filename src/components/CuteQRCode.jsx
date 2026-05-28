import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'

const qrCode = new QRCodeStyling({
    width: 220,
    height: 220,
    type: 'svg',
    data: 'https://yourdomain.com/track/thorana-main',
    image: '/lotus.png',
    dotsOptions: {
        color: '#e6b84e',
        type: 'rounded',
    },
    backgroundOptions: {
        color: '#0d0a04',
    },
    cornersSquareOptions: {
        color: '#ffdf9c',
        type: 'extra-rounded',
    },
    cornersDotOptions: {
        color: '#c43a2a',
        type: 'dot',
    },
    imageOptions: {
        crossOrigin: 'anonymous',
        margin: 8,
    },
})

export default function CuteQRCode() {
    const ref = useRef(null)

    useEffect(() => {
        if (ref.current) {
            qrCode.append(ref.current)
        }
    }, [])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 20,
            }}
        >
            <div
                style={{
                    background: 'linear-gradient(145deg, #1a1206, #0d0a04)',
                    padding: 18,
                    borderRadius: 24,
                    boxShadow: '0 0 40px rgba(230,184,78,0.35)',
                    border: '1px solid #e6b84e',
                }}
            >
                <div ref={ref} />
            </div>
        </div>
    )
}