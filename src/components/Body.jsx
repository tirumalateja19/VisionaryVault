import Header from "./Header";
import writing from "../utils/Images/writing.png";
import office from "../utils/Images/office.jpg";
import dashboard from "../utils/Images/dashboard.png";

function Body() {
  return (
    <div className="flex min-h-svh flex-col bg-stone-50 text-zinc-900 antialiased">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <section className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-4">
              <span className="inline-block w-fit rounded-full border border-emerald-200 bg-white px-4 py-2 mb-3 text-xs font-medium text-emerald-700">
                Organize. Learn. Unwind.
              </span>
              <h1 className="font-sans text-pretty text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Your all-in-one hub to manage tasks and notes seamlessly in one
                place
              </h1>
              <p className="max-w-prose mt-5 text-zinc-600 leading-relaxed">
                Replace scattered sticky notes and cluttered apps with a single,
                minimal workspace. Manage tasks, jot notes, and track movies—so
                you can focus on growing at a sustainable pace.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
                <img
                  src={dashboard}
                  alt="Preview of the ProgressTrack dashboard featuring tasks, notes, and movies in a clean layout"
                  className="h-auto w-full rounded-lg object-cover shadow-md border border-emerald-300"
                />
              </div>
            </div>
          </section>

          <section className="mt-20 grid gap-6 h-[19vh] sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-emerald-500">
              <h3 className="text-lg font-semibold">Tasks without clutter</h3>
              <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
                Clear, lightweight task management to keep priorities visible
                and actionable.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-emerald-500">
              <h3 className="text-lg font-semibold">Notes that stick</h3>
              <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
                Capture ideas and learning moments in a simple, organized space.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition-colors hover:border-emerald-500">
              <h3 className="text-lg font-semibold">Movies to enjoy</h3>
              <p className="mt-1 text-sm text-zinc-600 leading-relaxed">
                Track what you’ve watched and what’s next for balanced downtime.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Body;
