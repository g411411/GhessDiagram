import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { isBeginnerLesson } from './video-library';

it('recognizes beginner and beginners in titles or descriptions, regardless of case', () => {
  expect(isBeginnerLesson({ title: 'Lesson', url: '', description: 'For BEGINNER players' })).toBe(
    true,
  );
  expect(isBeginnerLesson({ title: 'For Beginners', url: '' })).toBe(true);
  expect(isBeginnerLesson({ title: 'Advanced endings', url: '' })).toBe(false);
});

it('highlights all three beginner titles even when the interface is translated', async () => {
  localStorage.clear();
  await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  const fixture = TestBed.createComponent(App);
  const app = fixture.componentInstance;
  app.chooseLanguage('ru');
  app.saveLanguage();
  app.selectTab('videos');
  fixture.detectChanges();
  const titles = fixture.nativeElement.querySelectorAll('#video-library h2.beginner-title');
  expect(titles.length).toBe(3);
  expect([...titles].every((title: any) => title.textContent.includes('начинающих'))).toBe(true);
  localStorage.clear();
  document.documentElement.lang = 'en';
});
