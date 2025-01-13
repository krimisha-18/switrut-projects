const Quiz = require('./models/Quiz');

const sampleQuizzes = [
  {
    title: "JavaScript",
    description: "Test your knowledge of advanced JavaScript concepts",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    questions: [
      {
        text: "What is closure in JavaScript?",
        options: [
          "A function that has access to variables in its outer scope",
          "A way to close browser window",
          "A method to end loops",
          "A type of error handling"
        ],
        correctAnswer: 0
      },
      {
        text: "What is the output of: typeof null?",
        options: [
          "null",
          "undefined",
          "object",
          "number"
        ],
        correctAnswer: 2
      },
      {
        text: "Which method is used to serialize an object into a JSON string?",
        options: [
          "JSON.toString()",
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.serialize()"
        ],
        correctAnswer: 1
      },
      {
        text: "What is the purpose of the 'use strict' directive?",
        options: [
          "To enable strict type checking",
          "To enforce stricter parsing and error handling",
          "To enable new JavaScript features",
          "To improve performance"
        ],
        correctAnswer: 1
      },
      {
        text: "What is event bubbling?",
        options: [
          "A way to create new events",
          "Events triggered from child to parent elements",
          "A method to stop event propagation",
          "A type of event listener"
        ],
        correctAnswer: 1
      },
      {
        text: "What is the difference between let and var?",
        options: [
          "let is block-scoped, var is function-scoped",
          "let is function-scoped, var is block-scoped",
          "There is no difference",
          "let is slower than var"
        ],
        correctAnswer: 0
      },
      {
        text: "What is a Promise in JavaScript?",
        options: [
          "A guarantee of future payment",
          "A proxy for a value that will be available immediately",
          "A proxy for a value that will be available in the future",
          "A type of function"
        ],
        correctAnswer: 2
      },
      {
        text: "What is the purpose of async/await?",
        options: [
          "To make code run faster",
          "To write synchronous-looking asynchronous code",
          "To prevent errors",
          "To create new threads"
        ],
        correctAnswer: 1
      },
      {
        text: "What is the prototype chain?",
        options: [
          "A series of linked lists",
          "A way to link multiple objects together",
          "The mechanism by which objects inherit features from one another",
          "A type of data structure"
        ],
        correctAnswer: 2
      },
      {
        text: "What is hoisting in JavaScript?",
        options: [
          "Moving elements up in the DOM",
          "Moving declarations to the top of their scope",
          "Lifting heavy objects",
          "A type of performance optimization"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    title: "React",
    description: "Test your understanding of React core concepts",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    questions: [
      {
        text: "What is the Virtual DOM?",
        options: [
          "A lightweight copy of the actual DOM",
          "A virtual reality interface",
          "A browser extension",
          "A JavaScript library"
        ],
        correctAnswer: 0
      },
      {
        text: "What is JSX?",
        options: [
          "A JavaScript XML parser",
          "A syntax extension for JavaScript",
          "A new programming language",
          "A build tool"
        ],
        correctAnswer: 1
      },
      {
        text: "What is the purpose of useState hook?",
        options: [
          "To create global state",
          "To manage component state",
          "To handle side effects",
          "To optimize performance"
        ],
        correctAnswer: 1
      },
      {
        text: "What is a controlled component?",
        options: [
          "A component that controls other components",
          "A component whose value is controlled by React state",
          "A component with strict access control",
          "A component that can't be modified"
        ],
        correctAnswer: 1
      },
      {
        text: "What is the purpose of useEffect hook?",
        options: [
          "To handle side effects in functional components",
          "To create special effects",
          "To improve performance",
          "To handle errors"
        ],
        correctAnswer: 0
      },
      {
        text: "What is prop drilling?",
        options: [
          "A way to create holes in components",
          "Passing props through multiple levels of components",
          "A performance optimization technique",
          "A type of component composition"
        ],
        correctAnswer: 1
      },
      {
        text: "What is the Context API used for?",
        options: [
          "To create context menus",
          "To share state across components without prop drilling",
          "To handle API calls",
          "To manage routing"
        ],
        correctAnswer: 1
      },
      {
        text: "What are React keys used for?",
        options: [
          "Encryption",
          "Authentication",
          "Unique identification of elements in lists",
          "Performance optimization"
        ],
        correctAnswer: 2
      },
      {
        text: "What is the difference between state and props?",
        options: [
          "There is no difference",
          "Props are internal, state is external",
          "State is mutable, props are immutable",
          "Props are for styling only"
        ],
        correctAnswer: 2
      },
      {
        text: "What is React.memo used for?",
        options: [
          "To memorize things",
          "To prevent unnecessary re-renders",
          "To handle memory leaks",
          "To create memos"
        ],
        correctAnswer: 1
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    // Force update: Remove all existing quizzes first
    await Quiz.deleteMany({});
    console.log('Cleared existing quizzes');

    // Insert new quizzes
    await Quiz.insertMany(sampleQuizzes);
    console.log('Database seeded successfully with new quizzes');
    
    // Verify the insertion
    const count = await Quiz.countDocuments();
    console.log(`Total quizzes in database: ${count}`);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase; 