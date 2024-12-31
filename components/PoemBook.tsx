'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const poems = [
  {
    arabic: "حبيبتي عائشة، أنتِ نور حياتي\nكل يوم معكِ هو هدية\nحبك يملأ قلبي بالسعادة\nأنتِ حلمي الذي تحقق",
    english: "My beloved Aicha, you are the light of my life\nEvery day with you is a gift\nYour love fills my heart with joy\nYou are my dream come true"
  },
  {
    arabic: "عيناكِ كالنجوم تضيء ليلي\nابتسامتكِ تشرق كالشمس\nحبكِ يغمرني كالبحر\nأنتِ كل ما أحتاج، يا عائشة",
    english: "Your eyes like stars illuminate my night\nYour smile shines like the sun\nYour love engulfs me like the sea\nYou are all I need, Aicha"
  },
  {
    arabic: "في كل نبضة من قلبي\nأسمع اسمكِ، يا عائشة\nأنتِ الحب الذي طالما حلمت به\nمعكِ، أرى العالم بألوان أجمل",
    english: "In every beat of my heart\nI hear your name, Aicha\nYou are the love I've always dreamed of\nWith you, I see the world in more beautiful colors"
  },
  {
    arabic: "عائشة، أنتِ ملكة قلبي\nحبك يسري في عروقي\nكل لحظة معكِ هي كنز\nأنتِ سر سعادتي وابتسامتي",
    english: "Aicha, you are the queen of my heart\nYour love flows through my veins\nEvery moment with you is a treasure\nYou are the secret to my happiness and smile"
  },
  {
    arabic: "في عينيكِ أرى المستقبل\nفي ضحكتكِ أسمع الموسيقى\nفي حضنكِ أجد الراحة\nمعكِ يا عائشة، أنا كامل",
    english: "In your eyes, I see the future\nIn your laughter, I hear music\nIn your embrace, I find comfort\nWith you, Aicha, I am complete"
  },
  {
    arabic: "في عينيكِ أرى الكون بأسره وأنتِ نجمي الساطع",
   english:" In your eyes I see the entire universe and you are my shining star"
  },
{
arabic:"قلبي ينبض باسمك في كل لحظة ولا يعرف سواك يا خلود",
 english:"My heart beats your name every moment knowing no one but you khouloud "
},
{
  arabic:"أنت الورد في حديقة قلبي",
   english: "You are the rose in the garden of my heart"
  },
  {arabic:"يا راسما على شفاهى ابتساماتى وماسحاً بسحرك جراح حياتي أهديك باقه من الاشواق وحنيناً يسكن الاعماق وأياماً متوجه بالوافاء يا مالئاً حياتي بالحب والصفاء",
    english:"O you who draw smiles on my lips and with your magic wipe the wounds of my life I give you a bouquet of longing and a yearning that dwells in the depths and days crowned with loyalty O you who fill my life with love and purity"

  },
  {arabic:"علمني كيف انساك علمني كيف اهواك واكتفي علمني كيف اصل الى اعماقك وابدا الحكايه واسير على اوتار قلبك حتى النهايه",
english:" Teach me how to forget you teach me how to love you and be content teach me how to reach your depths and start the story and walk on the strings of your heart until the end"
},
{arabic:"جميل ذلك اللحن الذي يعزفه حبك لحن السعاده في النهار وفي الليل لحن الهيام والشوق والحنان",
english:"Beautiful is the melody that your love plays the melody of happiness in the day and at night the melody of passion longing and tenderness"
},
{arabic:"مهما تعددت النساء حبيبتي فالاصل أنت مهما اللغات تعددت والمفردات تعددت ف أهم ما في مفردات الشعر أنت مهما تنوعت المدائن والخرائط والمرافئ والدر وب فمرفئي الأبدي أنت مهما السماء تجهّمت أو أبرقت أو أرعدت فالشمس أنت",
  english:"No matter how many women there are my beloved you are the original no matter how many languages and words there are the most important word in poetry is you no matter how varied the cities maps harbors and roads my eternal harbor is you no matter how the sky darkens flashes or thunders you are the sun"
  }
]
export default function PoemBook() {
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % poems.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + poems.length) % poems.length)
  }

  return (
    <motion.div
      className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Our Love Poems</h3>
        <p className="text-sm">Page {currentPage + 1} of {poems.length}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Arabic</h4>
        <p className="whitespace-pre-line text-right">{poems[currentPage].arabic}</p>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">English</h4>
        <p className="whitespace-pre-line">{poems[currentPage].english}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition duration-300"
          onClick={prevPage}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </motion.div>
  )
}

