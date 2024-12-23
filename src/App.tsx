import { Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ArticleList, ArticleListSkeleton } from "@/components/ArticleList";
import { ArticleFilters } from "@/components/ArticleFilters";
import { MobileFilters } from "@/components/MobileFilters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PreferencesModal } from "@/components/PreferencesModal";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="fixed top-0 right-0 left-0 bg-white border-b z-50">
        <div className="container mx-auto px-4 lg:px-80 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">News Aggregator</h1>
            <PreferencesModal />
          </div>
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 lg:px-80 sm:mt-32 mt-44">
        <div className="lg:hidden mb-4 block">
          <MobileFilters />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Fixed Sidebar */}
          <aside className="hidden lg:block lg:fixed lg:w-64 h-[calc(100vh-8rem)] overflow-y-auto pt-4">
            <ArticleFilters />
          </aside>

          {/* Main Content Area */}
          <section className="lg:ml-72 flex-1">
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All News</TabsTrigger>
                <TabsTrigger value="personalized">
                  Personalized Feed
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Suspense fallback={<ArticleListSkeleton />}>
                  <ArticleList />
                </Suspense>
              </TabsContent>
              <TabsContent value="personalized">
                <Suspense fallback={<ArticleListSkeleton />}>
                  <ArticleList personalized />
                </Suspense>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
