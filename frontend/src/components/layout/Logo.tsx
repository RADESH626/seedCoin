"use client"
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-700">

                <Link href="/" className="absolute inset-0" />

                <Image
                    src="/logo 1.png"
                    alt="SeedCoin Logo"
                    fill
                    className="object-cover"
                />

            </div>
            <span className="text-xl font-bold text-white">SeedCoin</span>
        </div>
    );
}
