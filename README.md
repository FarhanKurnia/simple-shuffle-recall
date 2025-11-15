# 🃏 Memori Urutan Kartu

Permainan memori sederhana yang menantang kemampuan mengingat urutan kartu. Perhatikan tumpukan kartu yang dikocok, lalu susun kembali urutan yang benar dari semua kartu yang tersedia!

![Screenshot Game Memori Kartu](assets/img/screenshot-game.png) 
*(Anda bisa mengganti `assets/img/screenshot-game.png` dengan screenshot asli game Anda)*

## ✨ Fitur

* **Dua Fase Permainan:** Fase Mengingat dan Fase Menyusun Kembali.
* **Antarmuka Bersih:** Halaman awal terpisah untuk memulai tantangan.
* **Drag & Drop atau Klik-klik:** Fleksibilitas dalam menyusun kartu.
* **Penilaian Skor:** Dihitung berdasarkan jumlah kartu yang benar dan sisa waktu.
* **Responsif:** Tampilan yang menyesuaikan dengan berbagai ukuran layar (desktop, tablet, mobile).
* **Kartu Lengkap:** Menggunakan setumpuk kartu remi lengkap (52 kartu).

## 🚀 Instalasi & Menjalankan Proyek

Proyek ini adalah aplikasi web *front-end* murni, jadi Anda tidak memerlukan *server* atau *backend* khusus.

1.  **Kloning Repositori (jika ada):**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd nama-folder-proyek
    ```
    Jika tidak ada repositori, cukup unduh file ZIP proyek dan ekstrak ke folder pilihan Anda.

2.  **Buka File `index.html`:**
    Cukup buka file `index.html` langsung di *browser* web favorit Anda.
    *Klik kanan `index.html` -> `Open with` -> `[Pilih Browser Anda]`*

    Atau, jika Anda memiliki *server* lokal (seperti Live Server Extension di VS Code), Anda bisa menjalankannya melalui *server* tersebut untuk pengalaman pengembangan terbaik.

## 🎮 Cara Bermain

1.  **Halaman Awal:**
    * Saat pertama kali membuka game, Anda akan melihat halaman judul dengan tombol **"Mulai Tantangan"**.
    * Klik tombol tersebut untuk memulai permainan.

2.  **Fase Mengingat:**
    * Sebuah urutan kartu akan ditampilkan di layar untuk beberapa detik (misalnya, 5 detik).
    * Perhatikan baik-baik urutan kartu dan posisinya. Nomor urut akan membantu Anda mengingat.
    * Timer di pojok kanan atas akan menghitung mundur.

3.  **Fase Menyusun Kembali:**
    * Setelah waktu mengingat habis, layar akan beralih ke fase menyusun.
    * Anda akan melihat semua kartu remi yang berantakan di bagian atas (`Kartu Sumber`).
    * Di bagian bawah, ada slot-slot kosong yang harus Anda isi sesuai dengan urutan yang Anda ingat (`Slot Target`).
    * Anda dapat menyusun kartu dengan dua cara:
        * **Drag & Drop:** Seret kartu dari `Kartu Sumber` dan letakkan ke `Slot Target` yang Anda inginkan.
        * **Klik-klik:** Klik pada kartu di `Kartu Sumber` untuk memilihnya (kartu akan memiliki *highlight*). Kemudian, klik pada `Slot Target` kosong di mana Anda ingin menempatkannya. Jika Anda ingin mengembalikan kartu dari slot ke sumber, cukup klik pada kartu di slot tersebut.
    * Timer di pojok kanan atas akan menghitung mundur waktu Anda untuk menyusun.

4.  **Menyelesaikan Tantangan:**
    * Setelah Anda selesai menyusun urutan (atau waktu habis), klik tombol **"Selesai"**.
    * Sebuah *modal* akan muncul menampilkan hasil Anda:
        * Jumlah kartu yang benar.
        * Waktu yang digunakan.
        * Skor akhir Anda.

5.  **Main Lagi:**
    * Klik tombol **"Main Lagi"** di *modal* hasil untuk kembali ke halaman awal dan memulai tantangan baru.

##  Penilaian Skor

Skor Anda dihitung berdasarkan:

* **Poin Dasar:** `100 poin` untuk setiap kartu yang ditempatkan di posisi yang benar.
* **Bonus Kesempurnaan (jika semua kartu benar):**
    * `+500 poin` bonus tetap.
    * `+10 poin` untuk setiap detik sisa waktu (saat Anda menekan "Selesai" atau waktu habis).

## 🛠️ Teknologi yang Digunakan

* **HTML5:** Struktur dasar halaman web.
* **CSS3:** Styling (termasuk CSS Grid untuk layout kartu dan responsivitas).
* **JavaScript (ES6+):** Logika permainan, manajemen state, Drag & Drop, dan interaksi klik-klik.

## 📄 Struktur Proyek