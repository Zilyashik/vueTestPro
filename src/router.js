import Router from 'vue-router';
import RegistrationForm from '@/views/RegistrationForm';
import LoginForm from "@/views/LoginForm";
import Profile from "@/views/User/ProfilePage";
import Books from "@/views/Book/BooksPage"
import Authors from "@/views/Author/AuthorsPage"
import Book from "@/views/Book/BookPage"
import Author from "@/views/Author/AuthorPage";
import Favorite from "@/views/User/FavoriteBooksPage";
import AuthorBooks from "@/views/Author/AuthorBooksPage";
import CreateAuthor from "@/views/Author/CreateAuthorPage";
import UpdateAuthorPage from "@/views/Author/UpdateAuthorPage";
import CreateBookPage from "@/views/Book/CreateBookPage";
import UpdateBookPage from "@/views/Book/UpdateBookPage";

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'registration',
            component: RegistrationForm
        },
        {
            path: '/login',
            name: 'login',
            component: LoginForm
        },
        {
            path: '/me',
            name: 'profile',
            component: Profile
        },
        {
            path: '/books',
            name: 'books',
            component: Books
        },
        {
            path: '/authors',
            name: 'authors',
            component: Authors
        },
        {
            path: '/books/:id',
            name: 'bookPage',
            component: Book
        },
        {
            path: '/authors/:id',
            name: 'authorPage',
            component: Author
        },
        {
            path: '/favorites',
            name: 'favorite',
            component: Favorite
        },
        {
            path: '/authors/:id/books',
            name: 'authorBooks',
            component: AuthorBooks
        },
        {
            path: '/authors/create',
            name: 'createAuthor',
            component: CreateAuthor
        },
        {
            path: '/authors/update/:id',
            name: 'authorUpdatePage',
            component: UpdateAuthorPage
        },
        {
            path: '/books/create',
            name: 'bookCreatePage',
            component: CreateBookPage
        },
        {
            path: '/books/update/:id',
            name: 'bookUpdatePage',
            component: UpdateBookPage
        },
    ]
})