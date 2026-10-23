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
  expect(text.filter((title: string) => title.includes('начинающих')).length).toBe(3);
  expect(text).toContain('Ходы пешек — Lichess');
  expect(text).toContain('Как играть в шахматы — Lichess');
  const blue = fixture.nativeElement.querySelectorAll('#video-library h2.checkmate-title');
  expect(blue.length).toBe(7);
  expect([...blue].every((title: any) => title.textContent.toLowerCase().includes('мат'))).toBe(
    true,
  );
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
