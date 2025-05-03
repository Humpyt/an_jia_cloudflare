// Additional translations that can be added to the default translations
// This allows us to add new translations without modifying the main language-switcher.tsx file

type TranslationSet = {
  [key: string]: {
    [key: string]: string;
  };
};

export function addCustomTranslations(defaultTranslations: TranslationSet): TranslationSet {
  // Create a deep copy of the default translations
  const enhancedTranslations = JSON.parse(JSON.stringify(defaultTranslations));

  // Add new translations for English
  enhancedTranslations.en = {
    ...enhancedTranslations.en,
    // Search functionality translations
    "search": "Search",
    "searching": "Searching...",
    "search_started": "Search Started",
    "redirecting_to_results": "Redirecting to search results...",
    "search_error": "Search Error",
    "please_try_again": "Please try again later.",

    // Category selection translations
    "category_selected": "Category Selected",
    "showing_properties_in_category": "Showing properties in the {{category}} category",
    "selection_error": "Selection Error",

    // Property types
    "all": "All",
    "apartment": "Apartment",
    "house": "House",
    "land": "Land",
    "hotel": "Hotel",
    "commercial": "Commercial",

    // Property counts
    "properties_count": "{{count}} properties",
    "property_count": "{{count}} property",
    "properties": "Properties",
    "property": "Property",

    // Property details
    "property_summary": "Property Summary",
    "description": "Description",

    // Pagination
    "page": "Page",
    "previous_page": "Previous page",
    "next_page": "Next page",
    "no_properties_found": "No properties found",
    "try_different_filters": "Try different filters or reset the current ones",
    "resetting": "Resetting...",
  };

  // Add new translations for Chinese
  enhancedTranslations.zh = {
    ...enhancedTranslations.zh,
    // Search functionality translations
    "search": "搜索",
    "searching": "搜索中...",
    "search_started": "搜索已开始",
    "redirecting_to_results": "正在跳转到搜索结果...",
    "search_error": "搜索错误",
    "please_try_again": "请稍后再试。",

    // Category selection translations
    "category_selected": "已选择类别",
    "showing_properties_in_category": "显示{{category}}类别的房产",
    "selection_error": "选择错误",

    // Property types
    "all": "全部",
    "apartment": "公寓",
    "house": "住宅",
    "land": "土地",
    "hotel": "酒店",
    "commercial": "商业",

    // Property counts
    "properties_count": "{{count}}处房产",
    "property_count": "{{count}}处房产",
    "properties": "房产",
    "property": "房产",

    // Property details
    "property_summary": "房产概述",
    "description": "详细描述",

    // Pagination
    "page": "页面",
    "previous_page": "上一页",
    "next_page": "下一页",
    "no_properties_found": "未找到房产",
    "try_different_filters": "尝试不同的筛选条件或重置当前条件",
    "resetting": "重置中...",
  };

  // Add new translations for Japanese
  enhancedTranslations.ja = {
    ...enhancedTranslations.ja,
    // Search functionality translations
    "search": "検索",
    "searching": "検索中...",
    "search_started": "検索開始",
    "redirecting_to_results": "検索結果にリダイレクトしています...",
    "search_error": "検索エラー",
    "please_try_again": "後でもう一度お試しください。",

    // Category selection translations
    "category_selected": "カテゴリー選択",
    "showing_properties_in_category": "{{category}}カテゴリーの物件を表示しています",
    "selection_error": "選択エラー",

    // Property types
    "all": "すべて",
    "apartment": "アパート",
    "house": "一戸建て",
    "land": "土地",
    "hotel": "ホテル",
    "commercial": "商業施設",

    // Property counts
    "properties_count": "{{count}}件の物件",
    "property_count": "{{count}}件の物件",
    "properties": "物件",
    "property": "物件",

    // Property details
    "property_summary": "物件概要",
    "description": "詳細説明",

    // Pagination
    "page": "ページ",
    "previous_page": "前のページ",
    "next_page": "次のページ",
    "no_properties_found": "物件が見つかりません",
    "try_different_filters": "別のフィルターを試すか、現在のフィルターをリセットしてください",
    "resetting": "リセット中...",
  };

  return enhancedTranslations;
}
