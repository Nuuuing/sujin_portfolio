'use client'

import { ArrowIcon } from "@/components"
import { motion } from "motion/react"

export const MainSplash = () => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1.4, ease: "easeOut" }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                className="lg:mx-[5rem] font-medium text-center text-[2.8rem] ">
                <p>
                    다양한 경험, 더 넓은 시야.
                </p>
                <p>
                    성장으로 길을 찾아가는
                </p>
                <p>
                    개발자 <span className="font-semibold text-[#72AAFF]">김수진</span>입니다.
                </p>
            </motion.div>
            <div className="mt-[6rem]">
                <ArrowIcon />
            </div>
        </>
    )
}