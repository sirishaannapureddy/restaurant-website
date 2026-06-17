/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { Award, Star, Compass, Ship, Flame, Shield, History } from 'lucide-react';

const TIMELINE_DATA = [
  { year: '2001', title: 'The Initiation', desc: 'Chef de Cuisine Julian Marc lays the first stone of The Grand Table in the historical heart of Hyderabd Royale, with a dining salon of only 5 tables.' },
  { year: '2006', title: 'The First Michelin Star', desc: 'Following our organic Truffle Risotto breakthrough, the Michelin Guide reviews the restaurant, praising our unwavering focus on scent and sensory rhythm.' },
  { year: '2012', title: 'Atrium Expansion', desc: 'We unveil our glorious structural Glass Atrium Lounge, allowing banquets under the stars. Concurrently, our wine cellar surpasses 600 rare vintages.' },
  { year: '2019', title: 'The Triple Crown Stars', desc: 'The Grand Table is awarded its absolute third Michelin star, cementing our position of global fine-dining excellence.' },
  { year: '2026', title: 'The Digital Cellar Edition', desc: 'Pioneering premium white-glove custom home deliveries accompanied by real-time GPS tracking telemetry meters.' }
];

const TEAM_MEMBERS = [
  {
    name: 'Chef Julian Marc',
    role: 'Founder & Chef de Cuisine',
    bio: 'Vetted across centuries of classical French master cooking, Julian believes flavor is the ultimate bridge to human sentiment.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Sommelier Clarisse Vance',
    role: 'Grand Master Sommelier',
    bio: 'Curator of our vintage cellars. Clarisse marries ancient oaky tannins with delicate seafood alignments.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Master Pâtissier Henri Duval',
    role: 'Head Pastry Artisan',
    bio: 'An architect of sugars. Henri crafts Uji matchas and Pecan praline cake towers with micrometer precision.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600'
  }
];

export default function About() {
  const { theme } = useRestaurantStore();
  const isDark = theme === 'dark';

  return (
    <div className={`pt-4 pb-16 overflow-hidden ${isDark ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-900'}`} id="about-page-container">
      {/* Editorial Hero Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-gold-400 font-extrabold flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Our Gastronomic Journey
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold uppercase tracking-tight leading-tight">
              Honoring Flavor. <br />
              <span className="text-gold-400">Crafting Memories.</span>
            </h1>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              L&apos;Ambroisie did not materialize from classic business sheets. It was forged in the fiery passion of Chef Julian Marc&apos;s devotion. Since 2001, we have operated on the premise that fine-dining must transcend ingestion—it must be a memorable sensory liturgy.
            </p>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Every ingredient, from the white summer truffles harvested from proprietary Alba farms to our Iranian saffron, is sourced via fair partnerships. This ensures your portion represents pristine luxury culinary integrity.
            </p>
          </div>

          <div className="relative">
            {/* Elegant Double Overlay Images */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-gold-400/10 shadow-2xl z-10 group">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800"
                alt="Table setting at L'Ambroisie"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Small accent floating box */}
            <div className="absolute -bottom-6 -left-6 bg-gold-400 text-neutral-950 px-6 py-4 rounded-xl shadow-xl z-20 font-serif max-w-[190px]">
              <span className="block text-2xl font-black">3 Stars</span>
              <span className="font-mono text-[9px] uppercase tracking-wider block mt-1 text-neutral-600">Michelin standards maintained since 2019</span>
            </div>
          </div>
        </div>

        {/* 2. Core Philosophy Columns (Mission/Vision) */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 font-sans">
          <div className={`p-8 rounded-2xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
            <Flame className="w-6 h-6 text-gold-400 mb-4" />
            <h3 className="font-serif text-xl font-bold mb-2">Our Culinary Mission</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-450' : 'text-neutral-500'}`}>
              To systematically source wild-harvested, non-industrial, pristine agricultural components and layer them using classical and molecular cookeries—ensuring every mouthful evokes high emotion and culinary satisfaction.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border ${isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
            <Shield className="w-6 h-6 text-gold-400 mb-4" />
            <h3 className="font-serif text-xl font-bold mb-2">Our Gastronomic Vision</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-455' : 'text-neutral-500'}`}>
              To lead luxury hospitality by proof of execution. We combine zero-waste philosophy, green-energy woodfired stoves, and elegant transparent white-glove digital connections to serve both our guests and the environment.
            </p>
          </div>
        </div>

        {/* 3. Interactive Chronological Timeline */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <History className="w-6 h-6 text-gold-400 mx-auto mb-3" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-400 font-extrabold block mb-1">
              Historical Milestones
            </span>
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight">
              The Path to Mastery
            </h2>
          </div>

          <div className="relative border-l-2 border-gold-400/25 ml-4 md:ml-1/2 space-y-12">
            {TIMELINE_DATA.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-0 md:w-1/2 odd:md:pr-12 odd:md:text-right odd:md:-translate-x-full even:md:pl-12"
              >
                {/* Gold bullet indicator */}
                <div className="absolute top-1 left-0 md:left-auto md:right-0 md:translate-x-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-950 border-2 border-gold-400 rounded-full flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                </div>

                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-neutral-900 border-neutral-900' : 'bg-neutral-50 border-neutral-200'}`}>
                  <span className="font-mono text-xs font-bold text-gold-400 block mb-1">{item.year}</span>
                  <h4 className="font-serif text-lg font-bold mb-2">{item.title}</h4>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4. Vetted Roster / Team introduction */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-[9px] tracking-widest uppercase text-neutral-400 font-extrabold block mb-1">
              The Visionary Artisans
            </span>
            <h2 className="font-serif text-3xl font-bold uppercase tracking-tight">
              The Connoisseur Crew
            </h2>
            <p className={`text-xs mt-2 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
              The brilliant minds standing adjacent to Chef Julian Marc in our tandoor arrays and cellar dungeons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className={`group rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl hover:border-gold-300/30 ${
                  isDark ? 'bg-neutral-900/40 border-neutral-900 text-white' : 'bg-neutral-50 border-neutral-150 text-neutral-900'
                }`}
                id={`team-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="font-serif text-xs italic text-white">{member.role}</span>
                  </div>
                </div>

                <div className="p-5 font-sans">
                  <h4 className="font-serif text-lg font-bold">{member.name}</h4>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-gold-400 font-bold block mt-1">
                    {member.role}
                  </span>
                  <p className={`text-xs mt-3 leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
