"use client";

interface SQLCodeBlockProps {
  code: string;
  className?: string;
}

export default function SQLCodeBlock({ code, className = "" }: SQLCodeBlockProps) {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'LIMIT', 'AND', 'OR', 'AS', 'DESC', 'ASC', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'HAVING', 'DISTINCT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'IN', 'NOT', 'LIKE', 'BETWEEN'];
  
  const highlightSQL = (sql: string) => {
    const tokens: React.ReactNode[] = [];
    let currentPos = 0;
    const upperSQL = sql.toUpperCase();
    
    while (currentPos < sql.length) {
      let matched = false;
      
      // Check for keywords
      for (const keyword of keywords) {
        const upperKeyword = keyword.toUpperCase();
        if (upperSQL.startsWith(upperKeyword, currentPos)) {
          const nextChar = sql[currentPos + keyword.length];
          const isWordBoundary = !nextChar || /\W/.test(nextChar);
          
          if (isWordBoundary) {
            tokens.push(
              <span key={currentPos} className="text-[#569CD6] font-semibold">
                {sql.substring(currentPos, currentPos + keyword.length)}
              </span>
            );
            currentPos += keyword.length;
            matched = true;
            break;
          }
        }
      }
      
      if (matched) continue;
      
      // Check for strings
      if (sql[currentPos] === "'" || sql[currentPos] === '"') {
        const quote = sql[currentPos];
        let endPos = currentPos + 1;
        while (endPos < sql.length && sql[endPos] !== quote) {
          endPos++;
        }
        if (endPos < sql.length) endPos++;
        
        tokens.push(
          <span key={currentPos} className="text-[#CE9178]">
            {sql.substring(currentPos, endPos)}
          </span>
        );
        currentPos = endPos;
        continue;
      }
      
      // Check for numbers
      if (/\d/.test(sql[currentPos])) {
        let endPos = currentPos;
        while (endPos < sql.length && /\d/.test(sql[endPos])) {
          endPos++;
        }
        tokens.push(
          <span key={currentPos} className="text-[#B5CEA8]">
            {sql.substring(currentPos, endPos)}
          </span>
        );
        currentPos = endPos;
        continue;
      }
      
      // Check for comments
      if (sql[currentPos] === '-' && sql[currentPos + 1] === '-') {
        let endPos = currentPos;
        while (endPos < sql.length && sql[endPos] !== '\n') {
          endPos++;
        }
        tokens.push(
          <span key={currentPos} className="text-[#6A9955] italic">
            {sql.substring(currentPos, endPos)}
          </span>
        );
        currentPos = endPos;
        continue;
      }
      
      // Regular character
      tokens.push(sql[currentPos]);
      currentPos++;
    }
    
    return tokens;
  };

  return (
    <div className={`my-4 rounded-lg overflow-hidden border-2 border-gray-700 ${className}`}>
      <pre className="bg-[#1E1E1E] text-[#D4D4D4] p-4 overflow-x-auto font-mono text-sm leading-relaxed m-0">
        <code>{highlightSQL(code)}</code>
      </pre>
    </div>
  );
}

