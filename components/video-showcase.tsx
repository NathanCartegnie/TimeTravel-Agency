'use client'

import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from './motion'

export function VideoShowcase() {
    return (
        <section className="px-6 py-28">
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="mx-auto max-w-5xl"
            >
                <p className="mb-4 text-center text-xs uppercase tracking-[0.35em] text-gold">
                    Présentation
                </p>

                <h2 className="mb-10 text-center font-heading text-4xl font-medium text-ivory sm:text-5xl">
                    Découvrez TimeTravel Agency
                </h2>

                <div className="overflow-hidden rounded-3xl border border-gold/20 bg-panel shadow-2xl shadow-black/50">
                    <video
                        controls
                        preload="metadata"
                        poster="/minia_timetravel.png"
                        className="aspect-video w-full"
                    >
                        <source
                            src="/videos/timetravel-agency.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </motion.div>
        </section>
    )
}