import React from 'react';
import {
  Search,
  LayoutGrid,
  List,
  UploadCloud,
  Star,
  Edit3,
  Trash2,
  Eye,
  ChevronLeft,
  GripVertical,
  X,
  Plus,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';

export default function AdminGalleryTab({
  galleryPhotos = [],
  galleryCategoryFilter = 'all',
  setGalleryCategoryFilter,
  gallerySearchQuery = '',
  setGallerySearchQuery,
  galleryView = 'grid',
  setGalleryView,
  gallerySortBy = 'newest',
  setGallerySortBy,
  filteredGalleryPhotos = [],
  setIsUploadModalOpen,
  setEditingGalleryPhoto,
  togglePinPhoto,
  handleDeletePhoto,
  handleBatchSelectAll,
  handleDropFile,
  currentPage = 1,
  setCurrentPage,
  pinnedGalleryPhotos = [],
  handleUnpinPhoto,
  handlePinAnotherPhoto,
  handleDiscardGalleryChanges,
}) {
  return (
    <div className="space-y-6">
      {/* Category Pills & Search Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {[
            { id: 'all', label: `All Photos (${galleryPhotos.length > 5 ? galleryPhotos.length : 342})` },
            { id: 'Education', label: 'Education' },
            { id: 'Inclusive Learning', label: 'Inclusive Learning' },
            { id: 'Elderly Care', label: 'Elderly Care' },
            { id: 'Cleanliness Drives', label: 'Cleanliness Drives' },
            { id: 'Volunteers', label: 'Volunteers' },
          ].map((tab) => {
            const isActive = galleryCategoryFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGalleryCategoryFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#242424] text-white shadow-xs'
                    : 'bg-white text-[#666666] border border-[#EEEEEE] hover:bg-[#FFF9F5] hover:text-[#242424]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right: Search & View Switcher */}
        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
          <div className="relative w-44 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
            <input
              type="text"
              placeholder="Search by caption..."
              value={gallerySearchQuery}
              onChange={(e) => setGallerySearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-full border border-[#EEEEEE] bg-white text-xs text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] shadow-xs"
            />
          </div>

          <div className="inline-flex rounded-xl bg-white border border-[#EEEEEE] p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => setGalleryView('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                galleryView === 'grid'
                  ? 'bg-[#FFF0E8] text-[#FB7336]'
                  : 'text-[#888888] hover:text-[#242424]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGalleryView('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                galleryView === 'list'
                  ? 'bg-[#FFF0E8] text-[#FB7336]'
                  : 'text-[#888888] hover:text-[#242424]'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (lg:col-span-8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-5">
          {/* Card Header: Title + Photo count + Sort dropdown + Batch Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EEEEEE] gap-3">
            <div className="flex items-center gap-3">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                Community Media Library
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20">
                {filteredGalleryPhotos.length} Photos
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#888888]">Sort by:</span>
                <select
                  value={gallerySortBy}
                  onChange={(e) => setGallerySortBy(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl border border-[#EEEEEE] bg-white text-xs font-medium text-[#242424] focus:outline-none focus:border-[#FB7336] shadow-xs cursor-pointer"
                >
                  <option value="newest">Newest Uploads</option>
                  <option value="oldest">Oldest Uploads</option>
                  <option value="alpha">Title A-Z</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleBatchSelectAll}
                className="px-3 py-1.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs transition-colors cursor-pointer"
              >
                Batch Actions
              </button>
            </div>
          </div>

          {/* Photo Grid (or List View) */}
          {galleryView === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Tile 1: Dashed Upload Dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDropFile}
                className="border-2 border-dashed border-[#FB7336]/40 hover:border-[#FB7336] rounded-2xl p-5 flex flex-col items-center justify-center text-center bg-[#FFFDFB] hover:bg-[#FFF9F5] transition-all min-h-[260px] group cursor-pointer relative"
                onClick={() => setIsUploadModalOpen(true)}
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 stroke-[2.2]" />
                </div>
                <p className="font-bold text-xs text-[#242424]">
                  Drop photos here or Browse
                </p>
                <p className="text-[10px] text-[#888888] mt-1 mb-4">
                  JPG, PNG, WebP • Max 5MB
                </p>
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl border border-[#EEEEEE] bg-white text-xs font-semibold text-[#242424] shadow-xs group-hover:border-[#FB7336] transition-colors"
                >
                  Select Files
                </button>
              </div>

              {/* Photo Cards */}
              {filteredGalleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="rounded-2xl border border-[#EEEEEE] overflow-hidden bg-white shadow-xs hover:shadow-md hover:border-[#FB7336]/40 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-gray-100">
                    <img
                      src={photo.url}
                      alt={photo.caption || photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Category Badge top-left */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                      {photo.category}
                    </span>

                    {/* Floating Glass Actions top-right */}
                    <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs rounded-full px-1.5 py-1 flex items-center gap-1 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePinPhoto(photo.id);
                        }}
                        className={`p-1 rounded-full transition-colors cursor-pointer ${
                          photo.isPinned
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-gray-400 hover:text-amber-500'
                        }`}
                        title={photo.isPinned ? 'Unpin from highlights' : 'Pin to highlights'}
                      >
                        <Star className={`w-3.5 h-3.5 ${photo.isPinned ? 'fill-amber-400' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingGalleryPhoto({ ...photo });
                        }}
                        className="p-1 text-gray-500 hover:text-[#FB7336] transition-colors cursor-pointer"
                        title="Edit Photo Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePhoto(photo);
                        }}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-[#242424] truncate" title={photo.caption || photo.title}>
                        {photo.caption || photo.title}
                      </h4>
                      <p className="text-[10px] text-[#888888] mt-0.5">
                        Uploaded {photo.date || 'Oct 14, 2024'} • {photo.size || '2.4 MB'}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#EEEEEE]/80 flex items-center justify-between text-[10px]">
                      <span className="text-[#888888] flex items-center gap-1">
                        <Eye className="w-3 h-3 text-[#888888]" />
                        <span>{photo.views || 450} views</span>
                      </span>
                      <span className={`font-semibold ${
                        photo.badge === 'Hero Pinned' || photo.isPinned
                          ? 'text-[#FB7336]'
                          : photo.badge === 'Active Story'
                          ? 'text-amber-600'
                          : 'text-[#888888]'
                      }`}>
                        {photo.badge || (photo.isPinned ? 'Hero Pinned' : 'Standard')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List / Compact View */
            <div className="space-y-2.5">
              {filteredGalleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="p-3 rounded-xl border border-[#EEEEEE] bg-white hover:border-[#FB7336]/40 shadow-xs flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={photo.url}
                      alt={photo.caption || photo.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-[#242424] truncate">
                        {photo.caption || photo.title}
                      </h4>
                      <p className="text-[10px] text-[#888888]">
                        {photo.category} • Uploaded {photo.date || 'Oct 14, 2024'} • {photo.views || 450} views
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      photo.isPinned ? 'bg-[#FFF0E8] text-[#FB7336]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {photo.badge || (photo.isPinned ? 'Hero Pinned' : 'Standard')}
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePinPhoto(photo.id)}
                      className={`p-1.5 rounded-lg border border-[#EEEEEE] cursor-pointer ${
                        photo.isPinned ? 'text-amber-500' : 'text-gray-400'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${photo.isPinned ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingGalleryPhoto({ ...photo })}
                      className="p-1.5 rounded-lg border border-[#EEEEEE] text-gray-600 hover:text-[#FB7336] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePhoto(photo)}
                      className="p-1.5 rounded-lg border border-[#EEEEEE] text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="pt-4 border-t border-[#EEEEEE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#888888]">
            <span>Showing 1-6 of 342 photographs</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 rounded-lg border border-[#EEEEEE] bg-white text-[#242424] disabled:opacity-40 hover:bg-[#FFF9F5] cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {[1, 2, 3, '...', 57].map((num, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => typeof num === 'number' && setCurrentPage(num)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === num
                      ? 'bg-[#FB7336] text-white shadow-xs'
                      : 'bg-white text-[#666666] border border-[#EEEEEE] hover:bg-[#FFF9F5]'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-2.5 py-1 rounded-lg border border-[#EEEEEE] bg-white text-[#242424] hover:bg-[#FFF9F5] cursor-pointer text-xs font-semibold"
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Pinned on Gallery Page */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                Pinned on Gallery Page
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20">
                {pinnedGalleryPhotos.length} Slots Active
              </span>
            </div>

            <p className="text-xs text-[#666666]">
              These images appear on the public hero carousel and homepage highlights
            </p>

            <div className="space-y-2.5">
              {pinnedGalleryPhotos.map((pin) => (
                <div
                  key={pin.id}
                  className="p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-center justify-between gap-3 hover:border-[#FB7336]/30 transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={pin.thumbnail}
                      alt={pin.title}
                      className="w-11 h-11 rounded-lg object-cover shrink-0 border border-[#EEEEEE]"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-[#242424] truncate">
                        {pin.title}
                      </h4>
                      <p className="text-[11px] text-[#FB7336] font-medium">
                        {pin.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[#888888]">
                    <button
                      type="button"
                      className="p-1 hover:text-[#242424] cursor-grab"
                      title="Reorder"
                    >
                      <GripVertical className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUnpinPhoto(pin.id)}
                      className="p-1 hover:text-red-500 cursor-pointer"
                      title="Unpin"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handlePinAnotherPhoto}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#FB7336]/40 bg-[#FFF0E8]/50 text-[#FB7336] text-xs font-semibold hover:bg-[#FFF0E8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Pin Another Photo</span>
            </button>
          </div>

          {/* Card 2: Media Guidelines & Consent */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#FFF0E8] text-[#FB7336] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
                </div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-sm text-[#242424]">
                  Media Guidelines &amp; Consent
                </h3>
              </div>
              <p className="text-[11px] text-[#666666] pl-8">
                Compliance standards for foundation photo publishing
              </p>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FB7336] mt-1 shrink-0" />
                <span className="text-[#444444] text-[11px] leading-relaxed">
                  Photo consent verified (minors &amp; community guardians signed)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FB7336] mt-1 shrink-0" />
                <span className="text-[#444444] text-[11px] leading-relaxed">
                  Auto-optimize &amp; WebP compression (ON - 85% bandwidth saved)
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FB7336] mt-1 shrink-0" />
                <span className="text-[#444444] text-[11px] leading-relaxed">
                  Alt-text SEO &amp; Accessibility tags enabled
                </span>
              </div>
            </div>

            {/* Cloud Storage Progress Meter */}
            <div className="pt-2 border-t border-[#EEEEEE] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#242424]">Cloud Media Storage</span>
                <span className="text-[#666666] font-medium">4.2 GB / 10 GB (42%)</span>
              </div>
              <div className="w-full bg-[#EEEEEE] h-1.5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] w-[42%]" />
              </div>
            </div>
          </div>

          {/* Card 3: CDN Delivery Status */}
          <div className="bg-white rounded-2xl border border-[#EEEEEE] p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-base text-[#242424]">
                CDN Delivery Status
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Synced &amp; Live</span>
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-[#F5F5F5]">
                <span className="text-[#888888]">Last deployment:</span>
                <span className="font-semibold text-[#242424]">Today, 11:45 AM IST</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#888888]">Publisher:</span>
                <span className="font-semibold text-[#242424]">Lead Admin (Aarav Verma)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDiscardGalleryChanges}
              className="w-full py-2.5 rounded-xl bg-[#FFF0E8] text-[#FB7336] text-xs font-semibold border border-[#FB7336]/20 hover:bg-[#FB7336] hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard Unsaved Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
