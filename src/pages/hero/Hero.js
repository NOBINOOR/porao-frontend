import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import './Hero.css';
const ShuffleHero = () => {
  return (
    <section className=" w-full md:px-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:items-center gap-8 lg:max-w-7xl mx-auto mt-12">
      <div>
        <h3 className="text-start  text-white text-7xl md:text-9xl font-semibold hero-text ">
          Don't Sit 
        </h3>
        <h3 className="text-start font-mono mt-4 text-white text-4xl md:text-7xl font-semibold hero-text ">
           At Home
        </h3>
        <h3 className="text-start font-mono mt-4 text-white text-4xl md:text-7xl font-semibold hero-text ">
        Go Tuiton To 
        </h3>
        <h3 className="text-start font-mono mt-4 text-white text-4xl md:text-7xl font-semibold hero-text">
        Gain Knowledge
        </h3>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://img.freepik.com/free-vector/teacher-collection-concept_23-2148534112.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 2,
    src: "https://img.freepik.com/premium-vector/classroom-teacher-cute-students_679557-1386.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 3,
    src: "https://img.freepik.com/premium-vector/teacher-teaching-students-classroom-illustration_723224-739.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 4,
    src: "https://img.freepik.com/free-vector/bible-teaching-concept-illustration_114360-7906.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 5,
    src: "https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 6,
    src: "https://img.freepik.com/free-vector/teacher-concept-illustration_114360-2166.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 7,
    src: "https://img.freepik.com/free-vector/hand-drawn-flat-teachers-day-social-media-post-template_52683-70741.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 8,
    src: "https://img.freepik.com/free-vector/woman-teacher-with-students-classroom_24877-50499.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 9,
    src: "https://img.freepik.com/free-vector/flat-background-world-teachers-day_23-2150781094.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 10,
    src: "https://img.freepik.com/free-vector/tutoring-flat-composition-with-children-reading-with-female-teacher_1284-63595.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 11,
    src: "https://img.freepik.com/free-vector/organic-flat-people-business-training_23-2148909572.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 12,
    src: "https://img.freepik.com/free-vector/bible-teaching-concept-illustration_114360-7936.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 13,
    src: "https://img.freepik.com/premium-vector/classroom-teacher-cute-students_679557-1507.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 14,
    src: "https://img.freepik.com/free-vector/man-teacher-with-students-classroom_24877-50509.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 15,
    src: "https://img.freepik.com/free-vector/organic-flat-people-business-training-illustration_23-2148920666.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
  {
    id: 16,
    src: "https://img.freepik.com/free-vector/school-teacher-presenting-coronavirus-infographics-ban-restriction-children-flat-vector-illustration-epidemic-virus-spread-prevention_74855-8574.jpg?size=626&ext=jpg&ga=GA1.1.78409749.1684004130&semt=ais",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid  grid-cols-2 grid-rows-5 h-[550px] gap-1 ">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;