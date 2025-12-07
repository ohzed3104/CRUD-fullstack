
import useHookLogin from "../hooks/useHookLogin";

export const Login = () => {
const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin
  } = useHookLogin();
  

    

    return (
        <div className="bg-blue-300 h-screen w-screen flex justify-center items-center">
            <div className="p-7 max-w-md min-h-4/6 w-md rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-blue-400 shadow-lg">

                <div className="h-30 flex justify-center flex-col items-center gap-2">
                    <div className="font-bold text-3xl text-white">Welcome Back</div>
                    <span className="text-gray-500 h-2 text-end">Sign in to your account to continue</span>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-2 pt-8 px-1 mx-auto">

                        <div className="text-white font-bold">Email Address</div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-md h-9 p-3 text-gray-500"
                            type="text"
                            placeholder="email@example.com"
                        />

                        <div className="text-white font-bold">Password</div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-md h-9 p-3 text-gray-500"
                            type="password"
                            placeholder="••••••••••"
                        />

                        <div className="h-10 flex items-center">
                            <input
                                type="checkbox"
                                className="w-3 h-3 rounded bg-white/20 backdrop-blur-md border border-white/30"
                            />
                            <span className="text-gray-100 ml-2">Remember me</span>
                        </div>

                        <button
                            type="submit"
                            className="bg-white/80 backdrop-blur-md border border-white/30 rounded-md h-13 p-3 text-gray-500"
                        >
                            Sign In
                        </button>

                        <span className="text-white/90 pt-4 flex gap-2 items-center before:flex-1 before:h-px before:bg-white/30 after:flex-1 after:h-px after:bg-white/30">
                            dont have acc
                        </span>

                        <button className="bg-white/80 backdrop-blur-md border border-white/30 rounded-md h-13 p-3 text-gray-500">
                            create account
                        </button>

                    </div>
                </form>

                <div className="h-5 mt-4 max-w-md text-center">
                    <span className="text-white font-bold text-sm">@copyright 2025</span>
                </div>

            </div>
        </div>
    );
};
