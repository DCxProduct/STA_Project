# 🚀 Website NCDD Backend

A modern web application built with [Laravel](https://laravel.com/) — the PHP framework for web artisans.

---

## 🧰 Tech Stack

- **Backend**: Laravel 10.x
- **Frontend**: Blade / Vue.js (if applicable)
- **Database**: MySQL / PostgreSQL
- **Environment**: PHP 8.2+, Composer, Node.js
- **Dev Tools**: Laravel Artisan, Laravel Mix, Docker (optional)

---

## ✅ Requirements

Make sure your system has the following installed:

- PHP >= 8.2
- Composer
- Node.js and npm
- MySQL or PostgreSQL
- Git
- (Optional) Docker & Docker Compose

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/githubncdds/website_ncdd_backend.git
cd website_ncdd_backend/core
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Copy .env and Set Environment Variables

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Rename uploads.example to uploads

```bash
mv uploads.example uploads
```

### 5. Import Database

```bash
CMS-Database.zip
```

### 6. Serve the App

```bash
php artisan serve
```
