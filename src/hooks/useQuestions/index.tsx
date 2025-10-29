import { useState, useEffect } from 'react'
import { questions } from '@/data'

interface QuestionHistory {
  question: string
  timestamp: number
}

export const useQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState<string>('')
  const [history, setHistory] = useState<QuestionHistory[]>([])
  const [seenQuestions, setSeenQuestions] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Carrega do localStorage na inicialização
  useEffect(() => {
    const savedHistory = localStorage.getItem('questionHistory')
    const savedSeen = localStorage.getItem('seenQuestions')

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }

    if (savedSeen) {
      setSeenQuestions(new Set(JSON.parse(savedSeen)))
    }
  }, [])

  // Salva no localStorage quando houver mudanças
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('questionHistory', JSON.stringify(history))
    }
  }, [history])

  useEffect(() => {
    if (seenQuestions.size > 0) {
      localStorage.setItem('seenQuestions', JSON.stringify([...seenQuestions]))
    }
  }, [seenQuestions])

  const generateNewQuestion = async () => {
    setIsLoading(true)

    // Simula um delay para o loading ser visível
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Se já vimos todas as perguntas, reseta
    if (seenQuestions.size >= questions.length) {
      setSeenQuestions(new Set())
      localStorage.removeItem('seenQuestions')
    }

    // Filtra perguntas não vistas
    const availableQuestions = questions.filter((q) => !seenQuestions.has(q))

    if (availableQuestions.length === 0) {
      setIsLoading(false)
      return
    }

    // Seleciona uma pergunta aleatória
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const newQuestion = availableQuestions[randomIndex]

    // Atualiza estado
    setCurrentQuestion(newQuestion)
    setSeenQuestions((prev) => new Set([...prev, newQuestion]))

    // Adiciona ao histórico
    const newHistoryItem: QuestionHistory = {
      question: newQuestion,
      timestamp: Date.now(),
    }
    setHistory((prev) => [newHistoryItem, ...prev])

    setIsLoading(false)
  }

  const clearHistory = () => {
    setHistory([])
    setSeenQuestions(new Set())
    setCurrentQuestion('')
    localStorage.removeItem('questionHistory')
    localStorage.removeItem('seenQuestions')
  }

  return {
    currentQuestion,
    history,
    generateNewQuestion,
    clearHistory,
    questionsRemaining: questions.length - seenQuestions.size,
    totalQuestions: questions.length,
    isLoading,
  }
}
