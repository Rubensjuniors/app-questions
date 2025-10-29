import { Button } from '@/components/ui/button'
import { QuestionCard } from '@/components/QuestionCard'
import { HistoryList } from '@/components/HistoryList'
import { useQuestions } from '@/hooks/useQuestions'
import { RefreshCw } from 'lucide-react'

const Home = () => {
  const {
    currentQuestion,
    history,
    generateNewQuestion,
    clearHistory,
    questionsRemaining,
    totalQuestions,
    isLoading,
  } = useQuestions()

  return (
    <div className="min-h-screen from-background to-muted/20">
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm text-muted-foreground mt-2">
            {questionsRemaining} de {totalQuestions} perguntas disponíveis
          </p>
        </div>

        <div className="mb-8">
          <QuestionCard question={currentQuestion} isLoading={isLoading} />
        </div>

        <div className="flex justify-center mb-12">
          <Button
            onClick={generateNewQuestion}
            variant="default"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
            disabled={questionsRemaining === 0 || isLoading}
          >
            <RefreshCw
              className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
            />
            {isLoading
              ? 'Gerando...'
              : questionsRemaining === 0
              ? 'Todas perguntas respondidas!'
              : 'Gerar Nova Pergunta'}
          </Button>
        </div>

        {/* History */}
        <HistoryList history={history} onClear={clearHistory} />
      </div>
    </div>
  )
}

export default Home
