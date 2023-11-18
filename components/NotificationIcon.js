import Image from "next/image";


function NotificationIcon({ size, height, width, ...props }) {
    return (
        // <Image src="eth-icon.svg"  height={size || height || 24} width={size || width || 24} />

        <svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"
            height={size || height || 24} width={size || width || 24}
            style={{objectFit:"cover"}}
            {...props}
        >
            <path d="M15.0961 29.0648C22.9227 29.0648 29.2674 22.7613 29.2674 14.9855C29.2674 7.20967 22.9227 0.906128 15.0961 0.906128C7.2695 0.906128 0.924805 7.20967 0.924805 14.9855C0.924805 22.7613 7.2695 29.0648 15.0961 29.0648Z" fill="#627EEA" />
            <path d="M15.5376 4.42609V12.2313L22.1777 15.1792L15.5376 4.42609Z" fill="white" fill-opacity="0.602" />
            <path d="M15.537 4.42615L8.896 15.1793L15.537 12.2314V4.42615Z" fill="white" />
            <path d="M15.5376 20.2371V25.5406L22.1822 16.4075L15.5376 20.2371Z" fill="white" fill-opacity="0.602" />
            <path d="M15.537 25.5406V20.2362L8.896 16.4075L15.537 25.5406Z" fill="white" />
            <path d="M15.5376 19.0096L22.1777 15.1791L15.5376 12.233V19.0096Z" fill="white" fill-opacity="0.2" />
            <path d="M8.896 15.1791L15.537 19.0096V12.233L8.896 15.1791Z" fill="white" fill-opacity="0.602" />
        </svg>

    )
}

export default NotificationIcon;