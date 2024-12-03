import { useEffect, useState } from "react";
import WordExpanded from "./WordExpanded";
import loadingIcon from "../res/icons/loading-icon.svg";
import warningIcon from "../res/icons/warning-icon.svg";
import checkedIcon from "../res/icons/checked-icon.svg";

const AddWordModal = ({ setIsAddModal }) => {
  const [newWord, setNewWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchData = async () => {
    let result;
    try {
      fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" +
          String(newWord).toLowerCase()
      )
        .then((res) => {
          if (res.ok) {
            throw new Error("HTTP Error! status:", res.status);
          } else {
            return res.json();
          }
        })
        .then(async (data) => {
          result = await data[0];
          if (result["word"]) {
            console.log("RESULT:");
            console.log(result);
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsValid(false);
        })
        .finally(() => setIsLoading(false));
    } catch (err) {
      setIsValid(false);
      console.log(err);
    }

    return result;
  };

  const handleClick = async () => {
    if (isValid && !isLoading) {
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    if (newWord) {
      setIsLoading(true);
      fetchData()
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setIsValid(false);
    }
  }, [newWord]);

  useEffect(() => {
    if (isLoading) setIsValid(false);
  }, [isLoading]);

  const handleOnChange = (e) => {
    setNewWord(e.target.value);
  };

  return (
    <div
      id="add-word-modal-bg"
      className="fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] w-full h-full flex justify-center items-center backdrop-blur-sm"
      onClick={(e) => {
        if (e.target.id === "add-word-modal-bg") setIsAddModal(false);
      }}
    >
      <div className="w-1/3 h-1/2 min-w-[400px] bg-white rounded-xl flex flex-col relative justify-evenly">
        <div className="absolute w-full top-0 left-0 h-[10%] flex justify-center px-10 items-center bg-[--baseColor] text-white">
          <h1>Add a New Word</h1>
        </div>
        <div className="flex justify-center items-center flex-col">
          <input
            className="px-5 py-10 w-[70%] text-4xl rounded-md outline-none text-[--baseColor] uppercase placeholder:opacity-40 placeholder:text-center text-center border-b"
            placeholder="New Word"
            onChange={handleOnChange}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleClick();
              }
            }}
          />
          {newWord && (
            <div className="flex items-center mt-3">
              <h1 className="opacity-50 mr-2">
                Searching for: <span className="font-bold">{newWord}</span>
              </h1>

              {isLoading ? (
                <img className="animate-spin w-7" src={loadingIcon} />
              ) : !isLoading && !isValid ? (
                <img className="w-6" src={warningIcon} />
              ) : (
                <img className="w-6" src={checkedIcon} />
              )}
            </div>
          )}
          <div>
            <button
              className={`bg-[--baseColor] text-white font-bold uppercase my-10 px-10 py-2 rounded-md text-2xl ${
                !isValid
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              } disabled:bg-gray-700 disabled:pointer-events-none`}
              disabled={isLoading || !isValid}
              onClick={handleClick}
            >
              Check Definition
            </button>
          </div>
        </div>
      </div>
      {isExpanded && newWord && (
        <WordExpanded
          selectedWord={{ word: newWord }}
          setIsExpanded={setIsExpanded}
        />
      )}
    </div>
  );
};

export default AddWordModal;
