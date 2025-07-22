import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (session?.user) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name || session.user.email}!</h1>
            <p className="text-gray-600 mb-6">You are successfully authenticated with QIAM.</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">User Information:</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {session.user.name}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>ID:</strong> {session.user.id}</p>
            </div>
          </div>

          <form
            action={async () => {
              "use server"
              redirect('/api/auth/signout')
            }}
          >
            <button
              type="submit"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              Sign Out
            </button>
          </form>
        </main>
      </div>
    )
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Next.js with QIAM Authentication</h1>
          <p className="text-gray-600 mb-6">Please sign in to continue</p>
        </div>

        <form
          action={async () => {
            "use server"
            redirect('/api/auth/signin/qiam')
          }}
        >
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Sign In with QIAM
          </button>
        </form>
      </main>
    </div>
  );
}
