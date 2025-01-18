import React, { useState, useRef } from 'react';
import { Download, Check } from 'lucide-react';
import html2pdf from 'html2pdf.js';

type Language = 'ru' | 'en';
type CopyNotification = {
  show: boolean;
  position: { x: number; y: number };
};

function App() {
  const [language, setLanguage] = useState<Language>('ru');
  const [notification, setNotification] = useState<CopyNotification>({
    show: false,
    position: { x: 0, y: 0 },
  });
  const cvRef = useRef<HTMLDivElement>(null);
  const notificationTimeout = useRef<NodeJS.Timeout>();

  const exportToPDF = () => {
    if (cvRef.current) {
      const element = cvRef.current;
      const opt = {
        margin: [0.3, 0.3],
        filename: `cv-${language}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
        pagebreak: { avoid: ['section', 'p', 'div'] }
      };

      // Remove shadow and skill backgrounds before export
      element.classList.remove('shadow-lg');
      const skillTags = element.querySelectorAll('.skill-tag');
      skillTags.forEach(tag => {
        tag.classList.remove('bg-gray-100');
        tag.classList.add('pdf-skill-tag');
      });

      html2pdf().set(opt).from(element).save().then(() => {
        // Restore shadow and skill backgrounds after export
        element.classList.add('shadow-lg');
        skillTags.forEach(tag => {
          tag.classList.add('bg-gray-100');
          tag.classList.remove('pdf-skill-tag');
        });
      });
    }
  };

  const handleCopy = async (text: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    
    try {
      await navigator.clipboard.writeText(text);
      
      if (notificationTimeout.current) {
        clearTimeout(notificationTimeout.current);
        setNotification(prev => ({ ...prev, show: false }));
        // Small delay before showing new notification
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setNotification({
        show: true,
        position: {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 30,
        },
      });

      notificationTimeout.current = setTimeout(() => {
        setNotification(prev => ({ ...prev, show: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const content = {
    ru: {
      name: 'Карташев Игорь',
      title: 'Python Backend Developer',
      contact: {
        phone: '+79041138230',
        telegram: '@MelDxKviel',
        email: 'mega1hack52@gmail.com'
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
            'Реализовал Backend на FastAPI',
            'Разработал регистрацию и авторизацию с использованием JWT',
            'Использовал PostgreSQL и взаимодействие БД, разработал ORM взаимодействие при помощи SQLModel',
            'Интегрировал приложение с API сервиса Yandex Cloud для использования модели Yandex GPT',
            'Использовал Docker и Docker-compose для развертывания инфраструктуры',
            'Деплой проекта на VPS-сервере с использованием Nginx, Gunicorn и Uvicorn',
            'Установил SSL-сертификат, подключил домен',
          ],
        },
        {
          company: 'Sibdev',
          position: 'Практикант',
          period: 'ИЮНЬ 2023 - АВГУСТ 2023',
          details: [
            'Разработка приложения для управления финансами, включая учет доходов и расходов, а также отслеживание финансовых целей',
            'Внедрил авторизацию с использованием JWT',
            'Оптимизировал логику операций и управления счетами',
            'Разработал функционал финансовых целей с аналитическими отчетами',
            'Реализовал импорт и экспорт данных в формате xlsx',
            'Написал тесты для приложения',
            'Настроил Nginx для развертывания',
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
        phone: '+79041138230',
        telegram: '@MelDxKviel',
        email: 'mega1hack52@gmail.com'
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
            'Development of a finance management application, including income and expense tracking, as well as financial goal monitoring', 
            'Implemented JWT authentication', 
            'Optimized the logic of operations and account management', 
            'Developed the functionality for financial goals with analytical reports', 
            'Implemented data import and export in xlsx format', 
            'Wrote tests for the application', 
            'Configured Nginx for deployment',
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
      {/* Floating notification */}
      {notification.show && (
        <div
          className="fixed z-50 bg-gray-800 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm font-medium shadow-lg"
          style={{
            left: `${notification.position.x}px`,
            top: `${notification.position.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'fadeOut 2s ease-in-out',
          }}
        >
          <Check size={14} />
          Copied!
        </div>
      )}

      <div className="max-w-4xl mx-auto p-8">
        {/* Language switcher and PDF export */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={exportToPDF}
            className="px-4 py-2 rounded-md flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            <Download size={16} />
            PDF
          </button>
          <button
            onClick={() => setLanguage('ru')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              language === 'ru'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${
              language === 'en'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            EN
          </button>
        </div>

        {/* CV Content */}
        <div ref={cvRef} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          {/* Header */}
          <header className="border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {content[language].name}
            </h1>
            <h2 className="text-xl text-gray-600 mb-3">
              {content[language].title}
            </h2>
            <div className="text-gray-600 text-sm">
              <p>
                {language === 'ru' ? 'Телефон: ' : 'Phone: '}
                <a
                  href={`tel:${content[language].contact.phone}`}
                  onClick={(e) => handleCopy(content[language].contact.phone, e)}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {content[language].contact.phone}
                </a>
              </p>
              <p>
                {language === 'ru' ? 'Telegram: ' : 'Telegram: '}
                <a
                  href={`https://t.me/${content[language].contact.telegram.substring(1)}`}
                  onClick={(e) => handleCopy(content[language].contact.telegram, e)}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {content[language].contact.telegram}
                </a>
              </p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${content[language].contact.email}`}
                  onClick={(e) => handleCopy(content[language].contact.email, e)}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {content[language].contact.email}
                </a>
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href="https://github.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </header>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {content[language].sections.skills}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {content[language].skills.map((skill, index) => (
                <span
                  key={index}
                  className="skill-tag px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {content[language].sections.experience}
            </h3>
            <div className="space-y-3">
              {content[language].experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-3">
                  <h4 className="font-semibold text-gray-900">{exp.company}</h4>
                  <p className="text-gray-600 text-sm">{exp.position}</p>
                  <p className="text-gray-500 text-xs mb-1">{exp.period}</p>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-0.5">
                    {exp.details.map((detail, idx) => (
                      <li key={idx} className="leading-tight">{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {content[language].sections.education}
            </h3>
            <div className="border-l-2 border-gray-200 pl-3">
              <h4 className="font-semibold text-gray-900">
                {content[language].education.university}
              </h4>
              <p className="text-gray-600 text-sm">
                {content[language].education.location} —{' '}
                {content[language].education.degree}
              </p>
              <p className="text-gray-500 text-xs">
                {content[language].education.period}
              </p>
              <p className="text-gray-700 text-sm">
                {content[language].education.faculty}
              </p>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {content[language].sections.languages}
            </h3>
            <div className="space-y-1 text-sm">
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