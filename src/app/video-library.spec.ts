import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { isBeginnerLesson, videoTitleClass } from './video-library';

it('recognizes beginner and beginners in titles or descriptions, regardless of case', () => {
  expect(isBeginnerLesson({ title: 'Lesson', url: '', description: 'For BEGINNER players' })).toBe(
    true,
  );
  expect(isBeginnerLesson({ title: 'For Beginners', url: '' })).toBe(true);
  expect(isBeginnerLesson({ title: 'Advanced endings', url: '' })).toBe(false);
});

it('highlights beginner and requested introductory titles even when the interface is translated', async () => {
  localStorage.clear();
  await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  const fixture = TestBed.createComponent(App);
  const app = fixture.componentInstance;
  app.chooseLanguage('ru');
  app.saveLanguage();
  app.selectTab('videos');
  fixture.detectChanges();
  const titles = fixture.nativeElement.querySelectorAll('#video-library h2.beginner-title');
  expect(titles.length).toBe(5);
  const text = [...titles].map((title: any) => title.textContent);
  expect(text.filter((title: string) => title.includes('начинающих')).length).toBe(2);
  expect(text).toContain('Ходы пешек — Lichess');
  expect(text).toContain('Как играть в шахматы — Lichess');
  const blue = fixture.nativeElement.querySelectorAll('#video-library h2.checkmate-title');
  expect(blue.length).toBe(10);
  expect(
    [...blue].filter((title: any) => title.textContent.toLowerCase().includes('мат')).length,
  ).toBeGreaterThanOrEqual(7);
  expect(text).toContain('Мат | Шахматные термины | ChessKid');
  expect(
    fixture.nativeElement.querySelector('#video-library .visualization-title').textContent,
  ).toBe('Уроки визуализации — Lichess');
  localStorage.clear();
  document.documentElement.lang = 'en';
});

it('uses blue for checkmate titles and descriptions, including beginner lessons', () => {
  expect(videoTitleClass({ title: 'CHECKMATES for beginners', url: '' })).toBe('checkmate-title');
  expect(videoTitleClass({ title: 'Lesson', description: 'Checkmate practice', url: '' })).toBe(
    'checkmate-title',
  );
  expect(videoTitleClass({ title: 'Advanced endings', url: '' })).toBe('');
});

it('honors explicit title colors before automatic beginner or checkmate rules', () => {
  expect(videoTitleClass({ title: 'Checkmate', url: '', titleColor: 'red' })).toBe(
    'beginner-title',
  );
  expect(videoTitleClass({ title: 'Openings for Beginners', url: '', titleColor: 'blue' })).toBe(
    'checkmate-title',
  );
  expect(videoTitleClass({ title: 'Visualization', url: '', titleColor: 'green' })).toBe(
    'visualization-title',
  );
});
