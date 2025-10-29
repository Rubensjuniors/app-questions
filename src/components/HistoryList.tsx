import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, History } from "lucide-react";

interface QuestionHistory {
  question: string;
  timestamp: number;
}

interface HistoryListProps {
  history: QuestionHistory[];
  onClear: () => void;
}

export const HistoryList = ({ history, onClear }: HistoryListProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <Card className="p-6 border-border/50">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <History className="w-12 h-12 text-muted-foreground mb-3 opacity-50" />
          <p className="text-muted-foreground">Nenhuma pergunta no histórico ainda</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <div className="p-4 border-b border-border/50 flex justify-between items-center">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          Histórico
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors"
            >
              <p className="text-sm font-medium mb-2">{item.question}</p>
              <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
