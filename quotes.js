function getRandomQuote() {
    const quotes = [
      "Stay focused!",
      "One tab at a time.",
      "Do something today your future self will thank you for.",
      "Discipline equals freedom.",
      "Don’t watch the clock. Do what it does. Keep going.",
      "Small steps every day."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  