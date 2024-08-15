
import { useState } from 'react';
import { motion } from 'framer-motion';
import './App.css'

function App() {
  const [color, setColor] = useState('#FFFFFF')

  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
    >
      <h1 className="text-1xl font-bold mb-4 text-gray-800">Background Color Changer</h1>
      <div className="flex items-center space-x-4">
        <motion.input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-12 rounded-full cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <motion.button
          onClick={onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Change Color
        </motion.button>
      </div>
      <p className="mt-4 text-gray-600">Selected color: {color}</p>
    </motion.div>
  )
}

export default App
