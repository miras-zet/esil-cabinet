import React from 'react'

interface ModalProps {
  children: React.ReactNode
  title: string
  onClose: () => void
}

export function Modal({ children, title, onClose }: ModalProps) {
  return (
    <>
      <div onClick={onClose} />
      <div
        
      >
        <h1 className="text-2xl text-center mb-2">{ title }</h1>

        { children }
      </div>
    </>
  )
}