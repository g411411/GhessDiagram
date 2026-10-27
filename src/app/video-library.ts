export interface VideoLesson {
  title: string;
  url: string;
  description?: string;
  titleColor?: 'red' | 'blue' | 'green';
}

export function isBeginnerLesson(video: VideoLesson): boolean {
  return (
    /\bbeginners?\b/i.test(video.title + ' ' + (video.description ?? '')) ||
    ['Pawn Moves — Lichess', 'How to Play Chess — Lichess'].includes(video.title)
  );
}

export function videoTitleClass(video: VideoLesson): string {
  if (video.titleColor) {
    return { red: 'beginner-title', blue: 'checkmate-title', green: 'visualization-title' }[
      video.titleColor
    ];
  }
  if (/\bcheckmates?\b/i.test(video.title + ' ' + (video.description ?? ''))) {
    return 'checkmate-title';
  }
  return isBeginnerLesson(video) ? 'beginner-title' : '';
}

export const VIDEO_LIBRARY = [
  {
    title: 'Learn How to Play Chess for Beginners in Less Than 8 Minutes',
    url: 'https://youtu.be/IU6k-4rKf-g?si=TmaTrFa-Ce-N6Y6Y',
  },
  {
    title: 'Checkmate in 3 MOVES! | Chess Strategy | ChessKid',
    url: 'https://youtu.be/HRrfGgfQu2s?si=0RlmE2It_pePgaW-',
  },
  {
    title: 'How to win Chess in 2 moves!',
    url: 'https://youtu.be/_yDC2th_Trk?si=1eWBK_Yidi2FwX86',
  },
  {
    title: 'How Do I Castle in Chess? | Castling | ChessKid',
    url: 'https://youtu.be/4dLZ5bv2tn8?si=5vsMORku_Z-nXFgb',
  },
  {
    title: 'King & Queen Checkmate | ChessKid',
    url: 'https://youtu.be/WUEgprkpj10?si=11kG91Sfif_rqRpT',
  },
  { title: 'How to Checkmate with a King and Rook', url: 'https://youtu.be/NhXbCuM1dgY' },
  { title: 'How to Checkmate with Two Bishops', url: 'https://youtu.be/91cXhK6qnAQ' },
  { title: 'Knight and Bishop Checkmate', url: 'https://youtu.be/dHnz4U7qjfk' },
  { title: 'Top 10 Fastest Checkmates in History!', url: 'https://youtu.be/qlU3D_NcYd4' },
  {
    title: 'King and Queen Checkmate — Lichess',
    url: 'https://lichess.org/video/B4R3gF6pylc?tags=beginner/fundamentals',
  },
  {
    title: 'Pawn Moves — Lichess',
    url: 'https://lichess.org/video/yellEkdVtY8?tags=beginner/fundamentals',
  },
  {
    title: 'How to Play Chess — Lichess',
    url: 'https://lichess.org/video/SM2fcenx7KU?tags=beginner/fundamentals',
  },
  {
    title: 'Visualization Lessons — Lichess',
    titleColor: 'green',
    url: 'https://lichess.org/video?tags=beginner/fundamentals/visualization',
  },
  {
    title: 'How to Play Chess: Chess Rules for Beginners | ChessKid',
    url: 'https://youtu.be/YdnvlntAQH8?si=UBBnM4aZLXF2FDCe',
  },
  {
    title: 'Checkmate | Chess Terms | ChessKid',
    url: 'https://youtu.be/Svswkqslr9I?si=XlH4h7GI4NEfdf-M',
    titleColor: 'red',
  },
  {
    title: 'Top 3 Best Chess Openings for Beginners | ChessKid',
    url: 'https://youtu.be/IcGt2A1b3NE?si=WdKJTYqxtX5Qalqa',
    titleColor: 'blue',
  },
  {
    title: 'The Basic Tactics Of Chess For Kids!',
    url: 'https://youtu.be/10IC86NSQZ8?si=En_a3EC0ZTlt6o5N',
    titleColor: 'blue',
  },
  {
    title: 'How to Defend Against Quick Mates & Traps',
    url: 'https://youtu.be/TIqJKO71400?si=C6y4Fc9b9sVQl7MX',
    titleColor: 'blue',
  },
] as const;
