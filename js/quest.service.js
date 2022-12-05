'use strict'
const STORAGE_KEY = 'questsDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
var gQuests = []

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  gCurrQuest = gQuestsTree
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    gCurrQuest = gQuestsTree
    gPrevQuest = null
  }
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  //*v* update the gPrevQuest, gCurrQuest global vars 
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  gPrevQuest[lastRes] = {
    txt: newQuestTxt,
    yes: createQuest(newGuessTxt),
    no: gCurrQuest
  }
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}
