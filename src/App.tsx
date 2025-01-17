import React, { useState, useRef } from 'react';
import { Download, CircleDot } from 'lucide-react';
import html2pdf from 'html2pdf.js';

type Language = 'ru' | 'en';

function App() {
  const [language, setLanguage] = useState<Language>('ru');
  const cvRef = useRef<HTMLDivElement>(null);

  const exportToPDF = () => {
    if (cvRef.current) {
      const element = cvRef.current;
      const opt = {
        margin: 0,
        filename: `cv-${language}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  const content = {
    ru: {
      name: 'Карташев Игорь',
      title: 'Python Backend Developer',
      contact: {
        phone: 'Телефон: +79041138230',
        telegram: 'Telegram: @MelDxKviel',
        email: 'Email: mega1hack52@gmail.com'
      },
      sections: {
        experience: 'ОПЫТ',
        skills: 'НАВЫКИ',
        education: 'ОБРАЗОВАНИЕ',
        languages: 'ЯЗЫКИ',
      },
      skills: [
        'Python',
        'FastAPI',
        'Django + Rest Framework',
        'PostgreSQL',
        'Nginx',
        'Linux',
        'Docker',
        'Redis',
        'Celery',
      ],
      languages: {
        russian: 'Русский',
        english: 'Английский — B1',
      },
      experience: [
        {
          company: 'Sentilens',
          position: 'Backend разработчик',
          period: 'НОЯБРЬ 2023 - ОКТЯБРЬ 2024',
          details: [
            'Разработка серверной части для приложения ведения дневника эмоций в рамках комплексной выпускной квалификационной работы.',
            'Реализовал Backend на FastAPI',
            'Разработал регистрацию и авторизацию с использованием JWT',
            'Использовал PostgreSQL и взаимодействие БД, разработал ORM взаимодействие при помощи SQLModel',
            'Интегрировал приложение с API сервиса Yandex Cloud для использования модели Yandex GPT',
            'Делпой проекта на VPS-сервере с использованием Docker и Nginx',
            'Установил SSL-сертификат, подключил домен',
          ],
        },
        {
          company: 'Sibdev',
          position: 'Практикант',
          period: 'ИЮНЬ 2023 - АВГУСТ 2023',
          details: [
            'Разработка приложения для учета доходов и расходов, а также трекинга финансовых целей.',
            'Реализовал авторизацию с помощью JWT',
            'Переработал логику операций и счета аккаунта',
            'Разработал функционал целей пользователя с аналитикой',
            'Реализовал функцию импорта и экспорта данных в xlsx',
          ],
        },
      ],
      education: {
        university: 'Сибирский Федеральный Университет',
        location: 'Красноярск',
        degree: 'Бакалавр',
        period: 'СЕНТЯБРЬ 2020 - ИЮНЬ 2024',
        faculty: 'Институт космических и информационных технологий, Прикладная информатика',
      },
    },
    en: {
      name: 'Igor Kartashev',
      title: 'Python Backend Developer',
      contact: {
        phone: 'Phone: +79041138230',
        telegram: 'Telegram: @MeDoXviel',
        email: 'Email: mega1hack52@gmail.com'
      },
      sections: {
        experience: 'EXPERIENCE',
        skills: 'SKILLS',
        education: 'EDUCATION',
        languages: 'LANGUAGES',
      },
      skills: [
        'Python',
        'FastAPI',
        'Django + Rest Framework',
        'PostgreSQL',
        'Nginx',
        'Linux',
        'Docker',
        'Redis',
        'Celery',
      ],
      languages: {
        russian: 'Russian',
        english: 'English — B1',
      },
      experience: [
        {
          company: 'Sentilens',
          position: 'Backend Developer',
          period: 'NOVEMBER 2023 - OCTOBER 2024',
          details: [
            'Developed the server-side for an emotion diary application as part of a comprehensive final qualification work.',
            'Implemented Backend using FastAPI',
            'Developed registration and authorization using JWT',
            'Used PostgreSQL and database interaction, developed ORM interaction using SQLModel',
            'Integrated the application with Yandex Cloud API service for using the Yandex GPT model',
            'Deployed the project on a VPS server using Docker and Nginx',
            'Installed SSL certificate, connected domain',
          ],
        },
        {
          company: 'Sibdev',
          position: 'Intern',
          period: 'JUNE 2023 - AUGUST 2023',
          details: [
            'Development of an application for income and expense accounting, as well as tracking financial goals.',
            'Implemented authorization using JWT',
            'Redesigned account operations and balance logic',
            'Developed user goals functionality with analytics',
            'Implemented data import and export function in xlsx',
          ],
        },
      ],
      education: {
        university: 'Siberian Federal University',
        location: 'Krasnoyarsk',
        degree: 'Bachelor',
        period: 'SEPTEMBER 2020 - JUNE 2024',
        faculty: 'Institute of Space and Information Technologies, Applied Informatics',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Language switcher and PDF export */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={exportToPDF}
            className="px-4 py-2 rounded-md flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            PDF
          </button>
          <button
            onClick={() => setLanguage('ru')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              language === 'ru'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              language === 'en'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            EN
          </button>
        </div>

        {/* CV Content */}
        <div ref={cvRef} className="bg-white shadow-lg rounded-lg p-8 space-y-8">
          {/* Header */}
          <header className="border-b pb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {content[language].name}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">
              {content[language].title}
            </h2>
            <div className="text-gray-600">
              <p>{content[language].contact.phone}</p>
              <p>{content[language].contact.telegram}</p>
              <p>{content[language].contact.email}</p>
              <div className="flex gap-3 mt-2">
                <a
                  href="https://github.com/MelDxKviel"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/igor-kartashev/"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </header>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {content[language].sections.skills}
            </h3>
            <div className="flex flex-wrap gap-2">
              {content[language].skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {content[language].sections.experience}
            </h3>
            <div className="space-y-6">
              {content[language].experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-4">
                  <h4 className="font-semibold text-gray-900">{exp.company}</h4>
                  <p className="text-gray-600 text-sm">{exp.position}</p>
                  <p className="text-gray-500 text-sm mb-2">{exp.period}</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {exp.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {content[language].sections.education}
            </h3>
            <div className="border-l-2 border-gray-200 pl-4">
              <h4 className="font-semibold text-gray-900">
                {content[language].education.university}
              </h4>
              <p className="text-gray-600">
                {content[language].education.location} —{' '}
                {content[language].education.degree}
              </p>
              <p className="text-gray-500 text-sm">
                {content[language].education.period}
              </p>
              <p className="text-gray-700 text-sm">
                {content[language].education.faculty}
              </p>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {content[language].sections.languages}
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                {content[language].languages.russian}
              </p>
              <p className="text-gray-700">
                {content[language].languages.english}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;