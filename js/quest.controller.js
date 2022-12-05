'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)
$('.btn-start').click(onStartGuessing)
$('.btn-yes').click({ans: 'yes'}, onUserResponse)
$('.btn-no').click({ans: 'no'}, onUserResponse)
$('.btn-add-guess').click(onAddGuess)
$('.btn-restart').click(onRestartGame)


function init() {
  createQuestsTree()
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide()
  createQuestsTree()
  renderQuest()
  $('.quest').show()
  // TODO: show the quest section
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  var quest = getCurrQuest()
  $('.quest h2').text(quest.txt)
}

function onUserResponse(ev) {
  console.log('ev', ev)
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.quest').hide()
      $('.right-guess').show()
      // TODO: improve UX
    } else {
      $('.img-guess').hide()
      $('.img-lose').show()
      $('.alert-warning').show()
      setTimeout(()=> {$('.alert-warning').hide()},2000)
      // TODO: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res
    moveToNextQuest(gLastRes)
    renderQuest()
  }
}

function onAddGuess(ev) {
  ev.preventDefault()
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newGuess,newQuest,gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  $('.right-guess').hide()
  $('.img-lose').hide()
  $('.img-guess').show()
  gLastRes = null
}
