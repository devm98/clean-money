import { login } from "../actions";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-6">
      <div className="w-full max-w-sm space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Chào mừng trở lại
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Đăng nhập để quản lý tài chính thông minh
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent p-2 text-zinc-900 dark:text-zinc-50 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            formAction={login}
            className="w-full rounded-lg bg-zinc-900 dark:bg-zinc-50 py-2.5 text-sm font-semibold text-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Chưa có tài khoản?{" "}
          <a href="/signup" className="text-purple-600 font-medium">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
}
