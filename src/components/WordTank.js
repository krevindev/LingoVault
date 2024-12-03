import { useEffect, useState } from "react";
import WordExpanded from "./WordExpanded";
import AddWordModal from "./AddWordModal";
import searchIcon from "../res/icons/search-btn-icon.svg";
import addBtnIcon from "../res/icons/add-btn-icon.svg";
import deleteBtnIcon from "../res/icons/delete-btn-icon.svg";

function getRandomInt(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

const WordItem = ({ word, index, animOrder, handleWordClick }) => {
  return (
    <div
      className={`px-5 py-5 bg-[--baseColor] brightness-105 max-h-[70px] my-1 min-w-fit w-fit mx-1 rounded-lg cursor-pointer hover:brightness-110 shadow-md hover:-translate-y-[5px] hover:scale-[1.1] transition-transform flex items-center justify-center word-item tracking-wide`}
      style={{ animationDelay: (animOrder - 1) * 0.1 + "s" }}
      onClick={() => handleWordClick(index)}
    >
      <h3 className="uppercase text-white text-[20px]">{word}</h3>
    </div>
  );
};

const WordTank = () => {
  const [wordData, setWordData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [expandedWordIndex, setExpandedWordIndex] = useState(null);

  const handleWordClick = (index) => {
    setIsExpanded(true);
    setExpandedWordIndex(index);
  };

  useEffect(() => {
    const isElectron = !!window && window.process && window.process.type;
    const jsonPath = isElectron
      ? `dummyData/wordsData.json` // Adjust path for Electron
      : "/dummyData/wordsData.json"; // Use public path in development

    fetch(jsonPath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP Error");
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setWordData(data);
      })
      .catch((error) => console.log("Error fetching data", error));
  }, []);

  return (
    <div className="w-[70%] max-w-[800px] min-w-[350px] h-[70%] bg-[--baseColor] box-border flex flex-col items-center justify-evenly py-[5%] px-[5%] rounded-xl relative">
      <div className="py-5">
        <h1 className="text-white pb-2 text-5xl uppercase italic font-bold">
          Word Vault
        </h1>
      </div>
      <div className="flex flex-wrap justify-center items-end w-full h-full border rounded-2xl overflow-scroll bg-clip-content overflow-x-hidden word-items-container">
        <div className="flex items-end flex-wrap w-screen h-fit py-10 flex-row justify-center bg-white relative">
          {wordData.map((word, index) => (
            <WordItem
              key={index}
              index={index}
              word={word["word"]}
              animOrder={wordData.length - index}
              handleWordClick={handleWordClick}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-between px-5 pb-3 pt-5">
        <img alt="search a word" className="cursor-pointer" src={searchIcon} />
        <img
          alt="add a word"
          className="cursor-pointer"
          src={addBtnIcon}
          onClick={() => setIsAddModal(true)}
        />
        <img
          alt="delete a word"
          className="cursor-pointer"
          src={deleteBtnIcon}
        />
      </div>

      {isExpanded && (
        <WordExpanded
          setIsExpanded={setIsExpanded}
          selectedWord={wordData[expandedWordIndex]}
        />
      )}

      {isAddModal && <AddWordModal setIsAddModal={setIsAddModal} />}
    </div>
  );
};

export default WordTank;
