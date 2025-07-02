import React from 'react'
import AppBar from '../../components/AppBar'
import BoardContent from './BoardContent'
import BoardBar from './BoardBar'

function Board() {
  return (
    <>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </>
  )
}

export default Board