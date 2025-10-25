import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: custom * 0.2, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <div className="relative flex items-center justify-center w-full min-h-[75vh] bg-zinc-900 text-white px-4 py-20">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop')" }}
        aria-hidden="true"
      />
      
      <div className="relative z-10 flex flex-col items-center max-w-4xl text-center">
        <motion.h1
          className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Enlightened to Enlighten
        </motion.h1>
        
        <motion.p
          className="mt-6 max-w-2xl text-lg italic opacity-90 md:text-xl"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          “You’ll be known as those who can fix anything, restore old ruins, 
          rebuild and renovate, make the community livable again.”
          <span className="block mt-2 not-italic font-semibold">— Isaiah 58:12</span>
        </motion.p>
        
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link to="/get-involved">Get Involved</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-zinc-900">
            <Link to="/programs">Our Programs</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}