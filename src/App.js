// App.js
import React, { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNewsId, setExpandedNewsId] = useState(null);

  const collections = [
    {
      title: 'Кровеносная система человека',
      author: 'Сергей МАРКОН',
      photoCredit: 'Фото: msk_art',
      photoLink: 'https://www.flickr.com/photos/msk_art',
    },
    {
      title: 'Мочеполовая система человека',
      author: 'Олег СТЕПАНОВ',
      photoCredit: 'Фото: olegst',
      photoLink: 'https://www.flickr.com/photos/olegst',
    },
    {
      title: 'Опорно-двигательная система',
      author: 'Денис ДИМЧЕНКО',
      photoCredit: 'Фото: dimch',
      photoLink: 'https://www.flickr.com/photos/dimch',
    },
  ];

  const news = [
    {
      id: 1,
      title: 'Открытие выставки работ, присланных на Международный конкурс анатомического рисунка "V-Anatemnо Art - 2026"',
      summary: 'Открытие выставки работ, присланных на Международный конкурс анатомического рисунка "V-Anatemnо Art - 2026"',
      fullText: 'Выставка пройдёт в главном корпусе университета с 1 по 30 июня. В экспозицию вошли лучшие работы студентов и профессиональных художников из 15 стран мира. Приглашаются все желающие. Вход свободный.',
    },
  ];

  const toggleNews = (id) => {
    setExpandedNewsId(expandedNewsId === id ? null : id);
  };

  const isSearchDisabled = searchQuery.trim() === '';

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>РГПУ</div>
        <button
          className={styles.burger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Меню"
        >
          ☰
        </button>
        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
          <button className={styles.navLink} onClick={() => console.log('Навигация на Главную')}>Главная</button>
          <button className={styles.navLink} onClick={() => console.log('Навигация на Университет')}>Университет</button> 
          <button className={styles.navLink} onClick={() => console.log('Навигация на Виртуальные музеи')}>Виртуальные музеи</button>
          <button className={styles.navLink} onClick={() => console.log('Навигация на Анатомический музей')}>Анатомический музей</button>
        </nav>
      </header>

      {/* Breadcrumbs */}
     <div className={styles.breadcrumbs}>
  <button className={styles.breadcrumbButton}>Главная</button> ▶ 
  <button className={styles.breadcrumbButton}>Университет</button> ▶ 
  <button className={styles.breadcrumbButton}>Виртуальные музеи и пространства</button> ▶ 
  <span>Анатомический музей</span>
</div>

      {/* Search */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Поиск по музею"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton} disabled={isSearchDisabled}>
          Найти
        </button>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.activeTab}`}>Коллекции и экспонаты</button>
        <button className={styles.tab}>Новости музея</button>
        <button className={styles.tab}>Контакты</button>
        <button className={styles.tab}>Расположение</button>
      </div>

      {/* Hero */}
      <section className={styles.hero}>
        <h1>Анатомический музей</h1>
        <p className={styles.heroText}>
          Фонды музея включают уникальные коллекции влажных и сухих анатомических препаратов,
          образцы микроскопической и экспериментальной техники, а также наборы учебных таблиц XIX – XX веков.
          Музейные коллекции расположены в специализированном помещении, оборудованном демонстрационными шкафами и витринами.
        </p>
        <button className={styles.detailsButton}>Подробнее ▶</button>
      </section>

      {/* Collections */}
      <section className={styles.section}>
        <h2>Коллекции и экспонаты</h2>
        <div className={styles.grid}>
          {collections.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <h3>{item.title}</h3>
              <p className={styles.author}>{item.author}</p>
              <a href={item.photoLink} className={styles.photoLink} target="_blank" rel="noopener noreferrer">
                {item.photoCredit}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section className={styles.section}>
        <h2>Новости музея</h2>
        <div className={styles.newsList}>
          {news.map((item) => (
            <div key={item.id} className={styles.newsItem}>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {expandedNewsId === item.id && <p className={styles.fullText}>{item.fullText}</p>}
              <button onClick={() => toggleNews(item.id)} className={styles.readMore}>
                {expandedNewsId === item.id ? 'Свернуть ▲' : 'Подробнее ▶'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts + Location */}
      <div className={styles.infoGrid}>
        <section className={styles.contacts}>
          <h2>Контакты</h2>
          <p><strong>Смотритель музея:</strong> Дария Михайловна Карошевская</p>
          <p><strong>Тел.:</strong> +7 ХХХ YYY NN NN</p>
          <p><strong>Почта:</strong> xxx@mail.ru</p>
          <button className={styles.vkButton}>Мы в VK ▶</button>
        </section>

        <section className={styles.location}>
          <h2>Расположение</h2>
          <p>Казанская ул., 35, корпус 3</p>
          <p>Факультет биологии</p>
        </section>
      </div>
    </div>
  );
}

export default App;