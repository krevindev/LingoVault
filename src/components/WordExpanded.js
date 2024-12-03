import { useEffect, useState } from "react";
import triangle1 from "../res/elements/triangle-bg-element.svg";
import triangle2 from "../res/elements/triangle-bg-element-2.svg";
import expandExitIcon from "../res/icons/expand-exit-btn-icon.svg";
import checkedIcon from "../res/icons/checked-icon.svg";
import addBtnIcon from "../res/icons/add-btn-icon.svg";
import pronounceIcon from "../res/icons/pronounce-icon.svg";

const WordExpanded = ({ setIsExpanded, selectedWord }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isWordStored, setIsWordStored] = useState(false);
  const [wordData, setWordData] = useState(null);

  const pronounceWord = (word) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    } else {
      alert("Sorry, your browser does not support text-to-speech!");
    }
  };

  useEffect(() => {
    setIsLoadingData(true);
    try {
      fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" +
          String(selectedWord["word"]).toLowerCase()
      )
        .then((res) => res.json())
        .then(async (data) => {
          setWordData(await data[0]);
          console.log(await data[0]);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoadingData(false));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div
      id="word-expansion-bg"
      className="fixed top-0 pt-[10vh] left-0 w-full h-full bg-[rgba(0,0,0,.5)] flex justify-center items-center backdrop-blur-sm"
      onClick={(e) => {
        if (e.target.id === "word-expansion-bg") {
          setIsExpanded(false);
        }
      }}
    >
      {/* Details Container */}
      <div className="w-[50vw] min-w-[400px] max-h-[80vh] max-w-[60vw] h-fit rounded-xl bg-white flex justify-start items-start flex-col relative overflow-y-auto">
        {wordData && (
          <div className="bg-gray-100 sticky top-0 left-0 min-h-fit w-full p-10 z-20">
            <img
              className="absolute left-0 top-0 w-[70px] -scale-100 scale-y-100"
              src={triangle2}
            />

            <button
              className="absolute w-10 right-[10px] top-[10px]"
              onClick={() => setIsExpanded(false)}
            >
              <img src={expandExitIcon} />
            </button>
            <div className="w-full h-full relative flex flex-wrap items-center">
              <h1 className="text-black text-left capitalize text-5xl font-bold mb-5 mr-5">
                {wordData["word"]}
              </h1>
              <div className="pb-3 bottom-0 right-0 text-[--baseColor] flex items-center">
                {isWordStored ? (
                  <>
                    <img className="w-6 mr-2" src={checkedIcon} />
                    <h6 className="brightness-75 ">Added to Vault</h6>
                  </>
                ) : (
                  <div className="flex items-center">
                    <button className="px-3 py-1 rounded-lg bg-[--baseColor] hover:brightness-110 text-white flex items-center active:translate-y-1 text-[12px] w-fit min-w-fit">
                      <img
                        className="brightness-100 mr-2 w-6 text-nowrap"
                        src={addBtnIcon}
                      />
                      <p className="text-nowrap">Save to Vault</p>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <button
                className="mr-5 bg-[--baseColor] rounded-full p-2"
                onClick={() => pronounceWord(wordData["word"])}
              >
                <img
                  className={`w-5 brightness-200 ${
                    isSpeaking && "pronunciation-btn-speaking"
                  }`}
                  src={pronounceIcon}
                />
              </button>
              <h4>
                {wordData["phonetic"] ? (
                  wordData["phonetic"]
                ) : (
                  <p className="opacity-55 italic">
                    Phonetic: Unabled to Retrieve
                  </p>
                )}
              </h4>
            </div>
          </div>
        )}

        {/* <p className="text-lg mt-10 text-left">{selectedWord["definition"]}</p> */}
        <div className="py-10 w-full">
          <div className="flex flex-col items-start justify-start *:text-left">
            {wordData &&
              wordData["meanings"].map((meaning, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-start px-10 my-3 z-10 border w-full relative"
                >
                  <div className="w-[2px] bottom-0 left-2 h-[90%] bg-[--baseColor] rounded-full absolute" />
                  {/* Part of Speech */}
                  <h4 className="font-bold text-3xl text-[--baseColor] mb-3">
                    {meaning["partOfSpeech"]}
                  </h4>
                  {meaning["definitions"].map((def) => (
                    <div className="mb-2 bg-[--baseColor] rounded-md px-5 py-5 text-white ">
                      <p className="text-left text-white text-2xl">
                        {def["definition"]}
                      </p>
                      {def["example"] && (
                        <div className="mt-3">
                          <h5>Example:</h5>
                          <p className="italic text-lg bg-white rounded-md text-[--baseColor] py-2 px-5 font-normal">
                            - {def["example"]}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordExpanded;
