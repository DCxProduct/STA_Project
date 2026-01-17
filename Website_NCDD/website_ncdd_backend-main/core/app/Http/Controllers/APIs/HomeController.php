<?php

namespace App\Http\Controllers\APIs;

use App\Http\Controllers\Controller;
use App\Mail\NotificationEmail;
use App\Models\AttachFile;
use App\Models\Banner;
use App\Models\Comment;
use App\Models\Contact;
use App\Models\Language;
use App\Models\Map;
use App\Models\Menu;
use App\Models\Photo;
use App\Models\Section;
use App\Models\Setting;
use App\Models\Topic;
use App\Models\TopicCategory;
use App\Models\TopicField;
use App\Models\Webmail;
use App\Models\WebmasterSection;
use App\Models\WebmasterSetting;
use Helper;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\File;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Mail;

class HomeController extends Controller
{
    public function __construct()
    {
        // Check API Status
        if (!Helper::GeneralWebmasterSettings("api_status")) {
            // API disabled
            exit();
        }
        Helper::SaveVisitorInfo(url()->current());
    }

    public function getLanguage($lang)
    {
        // List of active languages for API
        $Language = Language::where("status", true)->where("code", $lang)->first();

        if ($lang == "" || empty($Language)) {
            $lang = config('smartend.default_language');
        }
        return $lang;
    }

    public function website_status()
    {
        // Get Site Settings
        $Setting = Setting::find(1);
        // Response Details
        $msg = "";
        if ($Setting->site_status == 0) {
            $msg = nl2br($Setting->close_msg);
        }
        $response_details = [
            'status' => $Setting->site_status,
            'close_msg' => $msg
        ];
        // Response MSG
        $response = [
            'msg' => 'Website Status details',
            'details' => $response_details
        ];
        //return response()->json($response, 200);
        return $response;
    }

    public function website_info($lang = '')
    {
        // Get Site Settings
        $Setting = Setting::find(1);

        // By Language
        $lang = $this->getLanguage($lang);
        $site_title_var = "site_title_$lang";
        $site_desc_var = "site_desc_$lang";
        $site_keywords_var = "site_keywords_$lang";

        // Response Details
        $response_details = [
            'site_url' => $Setting->site_url,
            'site_title' => $Setting->$site_title_var,
            'site_desc' => $Setting->$site_desc_var,
            'site_keywords' => $Setting->$site_keywords_var,
            'site_webmails' => $Setting->site_webmails
        ];
        // Response MSG
        $response = [
            'msg' => 'Main information about the Website',
            'details' => $response_details
        ];
        //return response()->json($response, 200);
        return $response;
    }

    public function menu($menu_id, $lang = '')
    {
        if ($menu_id > 0) {
            // Get menu details
            $Menu = Menu::where('father_id', $menu_id)->where('status', 1)->orderby('row_no', 'ASC')->get();
            if (count($Menu) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $link_var = "link_$lang";

                // Response Details
                $response_details = [];
                foreach ($Menu as $MenuLink) {
                    $SubMenu = Menu::where('father_id', $MenuLink->id)->where('status', 1)->orderby('row_no', 'ASC')->get();
                    $sub_response_details = [];
                    if (count($SubMenu) > 0) {
                        foreach ($SubMenu as $SubMenuLink) {
                            $m_link = "";
                            if ($SubMenuLink->type == 3 || $SubMenuLink->type == 2) {
                                $m_link = $SubMenuLink->webmasterSection->name;
                            } elseif ($SubMenuLink->type == 1) {
                                $m_link = $SubMenuLink->$link_var;
                            }
                            $sub_response_details[] = [
                                'id' => $SubMenuLink->id,
                                'title' => $SubMenuLink->$title_var,
                                'section_id' => $SubMenuLink->cat_id,
                                'href' => $m_link,

                            ];
                        }
                    }

                    $m_link = "";
                    $sub_count = count($SubMenu);
                    if ($MenuLink->type == 3) {
                        // Section with drop list
                        $m_link = $MenuLink->webmasterSection->name;
                        $sub_count = count($MenuLink->webmasterSection->sections);
                        foreach ($MenuLink->webmasterSection->sections as $SubSection) {
                            $sub_response_details[] = [
                                'id' => $SubSection->id,
                                'title' => $SubSection->$title_var,
                                'section_id' => $MenuLink->cat_id,
                                'href' => "topics/cat/" . $SubSection->id
                            ];
                        }
                    } elseif ($MenuLink->type == 2) {
                        // Section Link
                        $m_link = $MenuLink->webmasterSection->name;
                    } elseif ($MenuLink->type == 1) {
                        //$m_link = $MenuLink->link;
                        $m_link = $MenuLink->$link_var;
                    }
                    $response_details[] = [
                        'id' => $MenuLink->id,
                        'title' => $MenuLink->$title_var,
                        'section_id' => $MenuLink->cat_id,
                        'href' => $m_link,
                        'sub_links_count' => $sub_count,
                        'sub_links' => $sub_response_details
                    ];
                    // sub links

                }
                // Response MSG
                $response = [
                    'msg' => 'List of Menu Links',
                    'links_count' => count($Menu),
                    'links' => $response_details
                ];
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Menu Links there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Menu Links there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    public function banners($group_id, $lang = '')
    {
        if ($group_id > 0) {
            // Get banners
            $Banners = Banner::where('section_id', $group_id)->where('status', 1)->orderby('row_no', 'DESC')->get();
            if (count($Banners) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $details_var = "details_$lang";
                $file_var = "file_$lang";
                $link_var = "link_$lang";

                // Response Details
                $response_details = [];
                $type = "";
                foreach ($Banners as $Banner) {
                    $type = $Banner->webmasterBanner->type;
                    $response_details[] = [
                        'id' => $Banner->id,
                        // 'title' => $Banner->$title_var,
                        // 'details' => nl2br($Banner->$details_var),
                        'file' => ($Banner->$file_var != "") ? url("") . "/uploads/banners/" . $Banner->$file_var : null,
                        'video_type' => $Banner->video_type,
                        'youtube_link' => $Banner->youtube_link,
                        //'link_url' => $Banner->$link_var,
                        'icon' => $Banner->icon
                    ];
                }
                // Response MSG
                $response = [
                    'msg' => 'List of Banners',
                    'type' => $type,
                    'banners_count' => count($Banners),
                    'banners' => $response_details
                ];
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Banners there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Banners there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    // Helper function to generate pagination links
    private function generatePaginationLinks(LengthAwarePaginator $paginator)
    {
        $links = [];
        $currentPage = $paginator->currentPage();
        $lastPage = $paginator->lastPage();


        // Previous link
        $previous_queryString = parse_url($paginator->previousPageUrl(), PHP_URL_QUERY);
        $links[] = [
            'url' => $previous_queryString = $previous_queryString ?? null,
            'label' => '&laquo;',
            'active' => false,
        ];

        // Page numbers (first 3 pages, last 3 pages, and nearby pages)
        for ($i = 1; $i <= $lastPage; $i++) {
            if ($i == 1 || $i == $lastPage || abs($i - $currentPage) <= 3) {
                $links[] = [
                    // 'url' => $i == $currentPage ? null : "{$paginator->path()}?page={$i}",
                    'url' => $i == $currentPage ? null : "page={$i}",
                    'label' => (string) $i,
                    'active' => $i == $currentPage,
                ];
            } elseif ($i == 2 || $i == $lastPage - 1) {
                $links[] = [
                    'url' => null,
                    'label' => '...',
                    'active' => false,
                ];
            }
        }

        // Next link
        $next_queryString = parse_url($paginator->nextPageUrl(), PHP_URL_QUERY);
        $links[] = [
            'url' => $next_queryString = $next_queryString ?? null,
            'label' => '&raquo;',
            'active' => false,
        ];

        return $links;
    }

    // Helper function to generate pagination links for Owso
    private function generatePaginationLinksOwso(LengthAwarePaginator $paginator, $Topics_var, $lang)
    {
        $links = [];
        $currentPage = $paginator->currentPage();
        $lastPage = $paginator->lastPage();

        // Page numbers (first 3 pages, last 3 pages, and nearby pages)
        for ($i = 1; $i <= $lastPage; $i++) {
            if ($i == 1 || $i == $lastPage || abs($i - $currentPage) <= $lastPage) {
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $title_var2 = "title_" . config('smartend.default_language');
                if ($Topics_var[$i-1][$title_var] != "") {
                    $Topic_title = $Topics_var[$i-1][$title_var];
                } else {
                    $Topic_title = $Topics_var[$i-1][$title_var2];
                }
                $links[] = [
                    'title' => $Topic_title,
                    'id' => $Topics_var[$i-1]['id'],
                    'url' => $i == $currentPage ? null : "category={$i}",
                    'label' => (string) $i,
                    'active' => $i == $currentPage,
                ];
            } 
        }

        return $links;
    }

    private function clean_data($TopicsList, $lang = '', $route = "topic/")
    {
        if (count($TopicsList) > 0) {
            $title_var = "title_$lang";
            $title_var2 = "title_" . config('smartend.default_language');
            $details_var = "details_$lang";
            $details_var2 = "details_" . config('smartend.default_language');
            $type = "";
            $section_title = "";

            // Response Details
            $response_details = [];
            foreach ($TopicsList as $Topic) {
                $type = $Topic->webmasterSection->type;
                $section_id = $Topic->webmaster_id;
                if ($Topic->webmasterSection->$title_var != "") {
                    $section_title = $Topic->webmasterSection->$title_var;
                } else {
                    $section_title = $Topic->webmasterSection->$title_var2;
                }


                $Joined_categories = [];
                foreach ($Topic->categories as $category) {
                    if ($category->section->$title_var != "") {
                        $Cat_title = $category->section->$title_var;
                    } else {
                        $Cat_title = $category->section->$title_var2;
                    }
                    $Joined_categories[] = [
                        'id' => $category->id,
                        'title' => $Cat_title,
                        'icon' => $category->section->icon,
                        'photo' => ($category->section->photo != "") ? url("") . "/uploads/sections/" . $category->section->photo : null,
                        'href' => "topics/cat/" . $category->id
                    ];
                }

                // additional fields
                $Additional_fields = [];
                foreach ($Topic->webmasterSection->customFields->where("in_listing", true) as $customField) {
                    if ($customField->in_page) {

                        $cf_saved_val = "";
                        $cf_saved_val_array = array();
                        if (count($Topic->fields) > 0) {
                            foreach ($Topic->fields as $t_field) {
                                if ($t_field->field_id == $customField->id) {
                                    if ($customField->type == 7) {
                                        // if multi check
                                        $cf_saved_val_array = explode(", ", $t_field->field_value);
                                        $cf_details_var = "details_" . @Helper::currentLanguage()->code;
                                        $cf_details_var2 = "details_" . config('smartend.default_language');
                                        if ($customField->$cf_details_var != "") {
                                            $cf_details = $customField->$cf_details_var;
                                        } else {
                                            $cf_details = $customField->$cf_details_var2;
                                        }
                                        $cf_details_lines = preg_split('/\r\n|[\r\n]/', $cf_details);
                                        $line_num = 1;
                                        foreach ($cf_details_lines as $cf_details_line) {
                                            if (in_array($line_num, $cf_saved_val_array)) {
                                                $cf_saved_val .= $cf_details_line . ", ";
                                            }
                                            $line_num++;
                                        }
                                        $cf_saved_val = substr($cf_saved_val, 0, -2);
                                    } else {
                                        $cf_saved_val = $t_field->field_value;
                                    }
                                }
                            }
                        }

                        if (($cf_saved_val != "" || count($cf_saved_val_array) > 0) && ($customField->lang_code == "all" || $customField->lang_code == "$lang")) {
                            $Additional_fields[] = [
                                'type' => $customField->type,
                                'title' => $customField->$title_var,
                                'value' => $cf_saved_val,
                            ];
                        }
                    }
                }

                $video_file = $Topic->video_file;
                if ($Topic->video_type == 0) {
                    $video_file = ($Topic->video_file != "") ? url("") . "/uploads/topics/" . $Topic->video_file : "";
                }
                if ($Topic->$title_var != "") {
                    $Topic_title = $Topic->$title_var;
                } else {
                    $Topic_title = $Topic->$title_var2;
                }
                if ($Topic->$details_var != "") {
                    $Topic_details = $Topic->$details_var;
                } else {
                    $Topic_details = $Topic->$details_var2;
                }
                $response_details[] = [
                    'id' => $Topic->id,
                    'title' => $Topic_title,
                    'details' => $Topic_details,
                    'date' => $Topic->date,
                    'video_type' => $Topic->video_type,
                    'video_file' => $video_file,
                    'photo_file' => ($Topic->photo_file != "") ? url("") . "/uploads/topics/" . $Topic->photo_file : null,
                    'audio_file' => ($Topic->audio_file != "") ? url("") . "/uploads/topics/" . $Topic->audio_file : null,
                    'attach_file' => ($Topic->attach_file != "") ? url("") . "/uploads/topics/" . $Topic->attach_file : null,          
                    'icon' => $Topic->icon,
                    'visits' => $Topic->visits,
                    'href' => $route . $Topic->id,
                    'fields_count' => count($Additional_fields),
                    'fields' => $Additional_fields,
                    'Joined_categories_count' => count($Topic->categories),
                    'Joined_categories' => $Joined_categories,
                    'section_id' => $section_id,
                    'user' => [
                        'id' => $Topic->user->id,
                        'name' => $Topic->user->name,
                        'href' => "user/" . $Topic->user->id . "/topics",
                    ]

                ];

            }
            return $response_details;
        } 
    }

    private function extract_text($text)
    {
        $details_html = $text ?? ''; 
        $details_html = preg_replace('/\x{FEFF}/u', '', $details_html);
        $clean_text = strip_tags($details_html);
        $clean_text = html_entity_decode($clean_text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $short_description = mb_substr($clean_text, 0, 500, 'UTF-8');

        if (mb_strlen($clean_text, 'UTF-8') > 500) {
            $short_description .= '...';
        }
        return $short_description;
    }

    public function topics($section_id, $page_number = 1, $topics_count = 0, $lang = '', $orderby = 'DESC', $route = "topic/")
    {
        if ($section_id > 0) {
            $WebmasterSection = WebmasterSection::find($section_id);
            if (!empty($WebmasterSection)) {
                // if private redirect back to home
                if ($WebmasterSection->type == 4 || $WebmasterSection->type == 7) {
                    // Empty MSG
                    $response = [
                        'msg' => 'There is no data'
                    ];
                    //return response()->json($response, 404);
                    return $response;
                }
            }

            if ($page_number < 1) {
                $page_number = 1;
            }
            Paginator::currentPageResolver(function () use ($page_number) {
                return $page_number;
            });

            // Get topics
            //$Topics = Topic::where([['webmaster_id', '=', $section_id], ['status', 1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['webmaster_id', '=', $section_id], ['status', 1], ['expire_date', null]])->orderby('id', $orderby);
            $Topics = Topic::where(function ($query) use ($section_id) {
                $query->where('webmaster_id', '=', $section_id)
                    ->where('status', 1)
                    ->where('expire_date', '>=', date("Y-m-d"))
                    ->whereNotNull('expire_date')
                    ->where('date', '>=', date("Y-m-d H:i")); 
            })->orWhere(function ($query) use ($section_id) {
                $query->where('webmaster_id', '=', $section_id)
                    ->where('status', 1)
                    ->whereNull('expire_date')
                    ->where('date', '<=', date("Y-m-d H:i")); 
            })->orderBy('id', $orderby);
            
            if ($topics_count > 0) {
                //
                if($section_id == config('dev.app.one_window_service_section')){
                    $Topics_var = $Topics->get();
                }
                $Topics = $Topics->paginate($topics_count);
                if($section_id != config('dev.app.one_window_service_section')){
                    // Generate pagination links
                    $links = $this->generatePaginationLinks($Topics);
                }else{
                    // Generate pagination links
                    $links = $this->generatePaginationLinksOwso($Topics, $Topics_var, $lang);
                }
            } else {
                $Topics = $Topics->get();
                $links = [];
            }

            if (count($Topics) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $title_var2 = "title_" . config('smartend.default_language');
                $details_var = "details_$lang";
                $details_var2 = "details_" . config('smartend.default_language');
                $type = "";
                $section_title = "";

                // Response Details
                $response_details = [];
                foreach ($Topics as $Topic) {
                    $type = $Topic->webmasterSection->type;
                    if($section_id != 26){
                        if ($Topic->webmasterSection->$title_var != "") {
                            $section_title = $Topic->webmasterSection->$title_var;
                        } else {
                            $section_title = $Topic->webmasterSection->$title_var2;
                        }
                    }else{
                        $mobile_lang = config('dev.app.mobile_url');
                        $section_title = ($mobile_lang[$lang] ?? $mobile_lang['en']);
                    }

                    $Additional_fields = [];
                    $Joined_categories = [];
                    foreach ($Topic->categories as $category) {
                        if ($category->section->$title_var != "") {
                            $Cat_title = $category->section->$title_var;
                        } else {
                            $Cat_title = $category->section->$title_var2;
                        }
                        $Joined_categories[] = [
                            'id' => $category->id,
                            'title' => $Cat_title,
                            'icon' => $category->section->icon,
                            'photo' => ($category->section->photo != "") ? url("") . "/uploads/sections/" . $category->section->photo : null,
                            'href' => "topics/cat/" . $category->id
                        ];

                        //get types
                        if(count($Topic->webmasterSection->customFields->where("in_listing", true)) >= 8)
                        {
                            $types = config('dev.app.types');
                            $type = ($types[$lang] ?? $types['en']);
                            $Additional_fields[] = [
                                'type' => 0,
                                'title' => $type,
                                'value' => $Cat_title,
                            ];
                        }
                    }

                    // additional fields
                    //$Additional_fields = [];
                    foreach ($Topic->webmasterSection->customFields->where("in_listing", true) as $customField) {
                        if ($customField->in_page) {

                            $cf_saved_val = "";
                            $cf_saved_val_array = array();
                            if (count($Topic->fields) > 0) {
                                foreach ($Topic->fields as $t_field) {
                                    if ($t_field->field_id == $customField->id) {
                                        if ($customField->type == 7) {
                                            // if multi check
                                            $cf_saved_val_array = explode(", ", $t_field->field_value);
                                            $cf_details_var = "details_" . @Helper::currentLanguage()->code;
                                            $cf_details_var2 = "details_" . config('smartend.default_language');
                                            if ($customField->$cf_details_var != "") {
                                                $cf_details = $customField->$cf_details_var;
                                            } else {
                                                $cf_details = $customField->$cf_details_var2;
                                            }
                                            $cf_details_lines = preg_split('/\r\n|[\r\n]/', $cf_details);
                                            $line_num = 1;
                                            foreach ($cf_details_lines as $cf_details_line) {
                                                if (in_array($line_num, $cf_saved_val_array)) {
                                                    $cf_saved_val .= $cf_details_line . ", ";
                                                }
                                                $line_num++;
                                            }
                                            $cf_saved_val = substr($cf_saved_val, 0, -2);
                                        } else {
                                            $cf_saved_val = $t_field->field_value;
                                        }
                                    }
                                }
                            }

                            if (($cf_saved_val != "" || count($cf_saved_val_array) > 0) && ($customField->lang_code == "all" || $customField->lang_code == "$lang")) {
                                if (Str::endsWith($customField->$title_var, "_$lang") || !Str::contains($customField->$title_var, '_')) {
                                    $Additional_fields[] = [
                                        'type' => $customField->type,
                                        'title' => explode('_', $customField->$title_var)[0],
                                        'value' => $cf_saved_val,
                                    ];
                                }
                            }
                        }
                    }

                    //get visitors
                    if(count($Topic->webmasterSection->customFields->where("in_listing", true)) >= 8)
                    {
                        $visitors = config('dev.app.visitors');
                        $visitor = ($visitors[$lang] ?? $visitors['en']);
                        $Additional_fields[] = [
                            'type' => 0,
                            'title' => $visitor,
                            'value' => $Topic->visits,
                        ];
                    }

                    $video_file = $Topic->video_file;
                    if ($Topic->video_type == 0) {
                        $video_file = ($Topic->video_file != "") ? url("") . "/uploads/topics/" . $Topic->video_file : "";
                    }
                    if ($Topic->$title_var != "") {
                        $Topic_title = $Topic->$title_var;
                    } else {
                        $Topic_title = $Topic->$title_var2;
                    }
                    if ($Topic->$details_var != "") {
                        $Topic_details = $Topic->$details_var;
                    } else {
                        $Topic_details = $Topic->$details_var2;
                    }
                    $response_details[] = [
                        'id' => $Topic->id,
                        'title' => $Topic_title,
                        'description' => $this->extract_text($Topic_details),
                        'details' => $Topic_details,
                        'date' => $Topic->date 
                                    ? \Carbon\Carbon::parse($Topic->date)->format('Y-m-d') 
                                    : null,
                        'expire_date' => $Topic->expire_date,
                        'video_type' => $Topic->video_type,
                        'video_file' => $video_file,
                        'photo_file' => ($Topic->photo_file != "") ? url("") . "/uploads/topics/" . $Topic->photo_file : null,
                        'audio_file' => ($Topic->audio_file != "") ? url("") . "/uploads/topics/" . $Topic->audio_file : null,
                        'icon' => $Topic->icon,
                        'visits' => $Topic->visits,
                        'href' => $route . $Topic->id,
                        'fields_count' => count($Additional_fields),
                        'fields' => $Additional_fields,
                        'Joined_categories_count' => count($Topic->categories),
                        'Joined_categories' => $Joined_categories,
                        'user' => [
                            'id' => $Topic->user->id,
                            'name' => $Topic->user->name,
                            'href' => "user/" . $Topic->user->id . "/topics",
                        ]

                    ];

                }

                if ($topics_count > 0) {
                    // Response MSG
                    $response = [
                        'msg' => 'List of Topics',
                        'section_id' => $section_id,
                        'section_title' => $section_title,
                        'type' => $type,
                        'topics_count' => $Topics->count(),
                        'current_page' => $Topics->currentPage(),
                        'last_page' => $Topics->lastPage(),
                        'next_page_url' => $Topics->nextPageUrl(),
                        'prev_page_url' => $Topics->previousPageUrl(),
                        'first_page_url' => $Topics->url(1),
                        'last_page_url' => $Topics->url($Topics->lastPage()),
                        'per_page' => $Topics->perPage(),
                        'total' => $Topics->total(),
                        'links' => $links,
                        'topics' => $response_details,
                    ];
                }else{
                    // Response MSG
                    $response = [
                        'msg' => 'List of Topics',
                        'section_id' => $section_id,
                        'section_title' => $section_title,
                        'type' => $type,
                        'topics_count' => $Topics->count(),
                        'topics' => $response_details,
                    ];
                }
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Topics there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Topics there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    public function website_contacts($lang = '')
    {
        // Get Site Settings
        $Setting = Setting::find(1);

        // By Language
        $lang = $this->getLanguage($lang);
        $address_var = "contact_t1_$lang";
        $working_time_var = "contact_t7_$lang";

        // Response Details
        $response_details = [
            'address' => $Setting->$address_var,
            'phone' => $Setting->contact_t3,
            'fax' => $Setting->contact_t4,
            'mobile' => $Setting->contact_t5,
            'email' => $Setting->contact_t6,
            'working_time' => $Setting->$working_time_var,
            'style' => $this->website_style($lang),
            'social' => $this->website_social($lang)
        ];

        $contacts_lang = config('dev.app.contacts_details');
        $contacts_lang = ($contacts_lang[$lang] ?? $contacts_lang['en']);
        // Response MSG
        $response = [
            'msg' => $contacts_lang,
            'details' => $response_details
        ];
        //return response()->json($response, 200);
        return $response;
    }

    public function website_style($lang = '')
    {
        // Get Site Settings
        $Setting = Setting::find(1);

        // By Language
        $lang = $this->getLanguage($lang);
        $style_logo_var = "style_logo_$lang";

        // Response Details
        $response_details = [
            'logo' => ($Setting->$style_logo_var != "") ? url("") . "/uploads/settings/" . $Setting->$style_logo_var : null,
            'fav_icon' => ($Setting->style_fav != "") ? url("") . "/uploads/settings/" . $Setting->style_fav : null,
            'apple_icon' => ($Setting->style_apple != "") ? url("") . "/uploads/settings/" . $Setting->style_apple : null,
            'style_color_1' => $Setting->style_color1,
            'style_color_2' => $Setting->style_color2,
            'layout_mode' => $Setting->style_type,
            'bg_type' => $Setting->style_bg_type,
            'bg_pattern' => ($Setting->style_bg_pattern != "") ? url("") . "/uploads/pattern/" . $Setting->style_bg_pattern : null,
            'bg_color' => $Setting->style_bg_color,
            'bg_image' => ($Setting->style_bg_image != "") ? url("") . "/uploads/settings/" . $Setting->style_bg_image : null,
            'footer_style' => $Setting->style_footer,
            'footer_bg' => ($Setting->style_footer_bg != "") ? url("") . "/uploads/settings/" . $Setting->style_footer_bg : null,
            'newsletter_subscribe_status' => $Setting->style_subscribe,
            'preload_status' => $Setting->style_preload
        ];
        // Response MSG
        $response = [
            'msg' => 'List of Style Settings',
            'details' => $response_details
        ];
        //return response()->json($response, 200);
        return $response;
    }

    public function website_social($lang = '')
    {
        // Get Site Settings
        $Setting = Setting::find(1);

        // Response Details
        $response_details = [
            'facebook' => $Setting->social_link1,
            'youtube' => $Setting->social_link2,
            'telegram' => $Setting->social_link3,
            'x' => $Setting->social_link4,
            'linkedin' => $Setting->social_link5,
            //'google' => $Setting->social_link3,
            //'youtube' => $Setting->social_link5,
            //'instagram' => $Setting->social_link6,
            //'pinterest' => $Setting->social_link7,
            //'tumblr' => $Setting->social_link8,
            //'flickr' => $Setting->social_link9,
            //'whatsapp' => $Setting->social_link10,
        ];

        $social_lang = config('dev.app.social_networks');
        $social_lang = ($social_lang[$lang] ?? $social_lang['en']);
        // Response MSG
        $response = [
            'msg' => $social_lang,
            'details' => $response_details
        ];
        //return response()->json($response, 200);
        return $response;
    }

    //getRelated_category of topic
    public function getRelated_category($topic_id, $lang = '', $route = "topic/")
    {
        if ($topic_id > 0) {

            // Get topic details
            $Topics = Topic::where([['id', '=', $topic_id], ['status',
                1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['id', '=', $topic_id], ['status', 1]])->orderby('row_no', 'DESC')->get();

            if (count($Topics) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $title_var2 = "title_" . config('smartend.default_language');

                // Response Details
                $response_details = [];
                foreach ($Topics as $Topic) {

                    $WebmasterSection = WebmasterSection::find($Topic->webmaster_id);
                    if (!empty($WebmasterSection)) {
                        // if private redirect back to home
                        if ($WebmasterSection->type == 4 || $WebmasterSection->type == 7) {
                            // Empty MSG
                            $response = [
                                'msg' => 'Topic there is no data'
                            ];
                            //return response()->json($response, 404);
                            return $response;
                        }
                    }

                    $type = $Topic->webmasterSection->type;
                    $section_id = $Topic->webmasterSection->id;
                    if ($Topic->webmasterSection->$title_var != "") {
                        $section_title = $Topic->webmasterSection->$title_var;
                    } else {
                        $section_title = $Topic->webmasterSection->$title_var2;
                    }

                    // categories
                    $Joined_categories = [];
                    foreach ($Topic->categories as $category) {
                        if ($category->section->$title_var != "") {
                            $Cat_title = $category->section->$title_var;
                        } else {
                            $Cat_title = $category->section->$title_var2;
                        }
                        $Joined_categories[] = [
                            'id' => $category->section_id,
                            'title' => $Cat_title,
                            'icon' => $category->section->icon,
                            'photo' => ($category->section->photo != "") ? url("") . "/uploads/sections/" . $category->section->photo : null,
                            'href' => "topics/cat/" . $category->section_id
                        ];
                    }

                    $response_details[] = [
                        'Joined_categories' => $Joined_categories,
                    ];

                }
                // Response MSG
                $response = [
                    'topic' => $response_details
                ];
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Topic there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Topic there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    //get relatednva(new , videos, announcement)
    public function relatednva($lang = '')
    {
        $page_number =1;

         //get news
        $news = $this->topics(config('dev.app.news_section'),  $page_number, config('dev.app.news_page_pagination'), $lang, 'desc', config('dev.app.news_route'));

        //get videos
        $videos = $this->topics(config('dev.app.videos_section'), $page_number, config('dev.app.news_video_pagination'), $lang, 'desc', config('dev.app.videos_detail_route'));

        //get other prakas
        $announcement = $this->category(config('dev.app.announcement'), $page_number, config('dev.app.news_prakas_pagination'), $lang, config('dev.app.opportunities_detail_route'));

        // Response MSG
        $response = [
            'news' => $news,
            'videos' => $videos,
            'prakas' => $announcement
        ];
        return $response;
    }

    public function topic($topic_id, $lang = '', $route = "/default/")
    {
        if ($topic_id > 0) {

            // Get topic details
            // $Topics = Topic::where([['id', '=', $topic_id], ['status',
            //     1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['id', '=', $topic_id], ['status', 1], ['expire_date', null]])->orderby('row_no', 'DESC')->get();
            $Topics = Topic::where([['id', '=', $topic_id], ['status',
            1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['id', '=', $topic_id], ['status', 1]])->orderby('row_no', 'DESC')->get();

            if (count($Topics) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $title_var2 = "title_" . config('smartend.default_language');
                $details_var = "details_$lang";
                $details_var2 = "details_" . config('smartend.default_language');
                $file_var = "file_$lang";
                $file_var2 = "file_" . config('smartend.default_language');

                $type = "";
                $section_id = "";
                $section_title = "";

                $Additional_fields = [];
                // Response Details
                $response_details = [];
                foreach ($Topics as $Topic) {

                    $WebmasterSection = WebmasterSection::find($Topic->webmaster_id);
                    if (!empty($WebmasterSection)) {
                        // if private redirect back to home
                        if ($WebmasterSection->type == 4 || $WebmasterSection->type == 7) {
                            // Empty MSG
                            $response = [
                                'msg' => 'Topic there is no data'
                            ];
                            //return response()->json($response, 404);
                            return $response;
                        }
                    }

                    $type = $Topic->webmasterSection->type;
                    $section_id = $Topic->webmasterSection->id;
                    if ($Topic->webmasterSection->$title_var != "") {
                        $section_title = $Topic->webmasterSection->$title_var;
                    } else {
                        $section_title = $Topic->webmasterSection->$title_var2;
                    }

                    // update visits
                    $Topic->visits = $Topic->visits + 1;
                    $Topic->timestamps = false;
                    $Topic->save();

                    $Additional_fields = [];
                    // categories
                    $Joined_categories = [];
                    foreach ($Topic->categories as $category) {
                        if ($category->section->$title_var != "") {
                            $Cat_title = $category->section->$title_var;
                        } else {
                            $Cat_title = $category->section->$title_var2;
                        }
                        $Joined_categories[] = [
                            'id' => $category->section_id,
                            'title' => $Cat_title,
                            'icon' => $category->section->icon,
                            'photo' => ($category->section->photo != "") ? url("") . "/uploads/sections/" . $category->section->photo : null,
                            'href' => "topics/cat/" . $category->section_id
                        ];

                        //get types
                        if(count($Topic->webmasterSection->customFields->where("in_listing", true)) >= 8)
                        {
                            $types = config('dev.app.types');
                            $type = ($types[$lang] ?? $types['en']);
                            $Additional_fields[] = [
                                'type' => 0,
                                'title' => $type,
                                'value' => $Cat_title,
                            ];
                        }
                    }

                    // additional fields
                    //$Additional_fields = [];
                    foreach ($Topic->webmasterSection->customFields->where("in_page", true) as $customField) {
                        if ($customField->in_page) {
                            $cf_saved_val = "";
                            $cf_saved_val_array = array();
                            if (count($Topic->fields) > 0) {
                                foreach ($Topic->fields as $t_field) {
                                    if ($t_field->field_id == $customField->id) {
                                        if ($customField->type == 7) {
                                            // if multi check
                                            $cf_saved_val_array = explode(", ", $t_field->field_value);
                                            $cf_details_var = "details_" . @Helper::currentLanguage()->code;
                                            $cf_details_var2 = "details_" . config('smartend.default_language');
                                            if ($customField->$cf_details_var != "") {
                                                $cf_details = $customField->$cf_details_var;
                                            } else {
                                                $cf_details = $customField->$cf_details_var2;
                                            }
                                            $cf_details_lines = preg_split('/\r\n|[\r\n]/', $cf_details);
                                            $line_num = 1;
                                            foreach ($cf_details_lines as $cf_details_line) {
                                                if (in_array($line_num, $cf_saved_val_array)) {
                                                    $cf_saved_val .= $cf_details_line . ", ";
                                                }
                                                $line_num++;
                                            }
                                            $cf_saved_val = substr($cf_saved_val, 0, -2);

                                        } else {
                                            $cf_saved_val = $t_field->field_value;
                                        }
                                    }
                                }
                            }    

                            if (($cf_saved_val != "" || count($cf_saved_val_array) > 0) && ($customField->lang_code == "all" || $customField->lang_code == "$lang")) {
                                if (Str::endsWith($customField->$title_var, "_$lang") || !Str::contains($customField->$title_var, '_')) {

                                    $Additional_fields[] = [
                                        'type' => $customField->type,
                                        'title' => explode('_', $customField->$title_var)[0],
                                        'value' => $cf_saved_val,
                                    ];
                                }
                            }
                        }
                    }

                    //get visitors
                    if(count($Topic->webmasterSection->customFields->where("in_listing", true)) >= 8)
                    {
                        $visitors = config('dev.app.visitors');
                        $visitor = ($visitors[$lang] ?? $visitors['en']);
                        $Additional_fields[] = [
                            'type' => 0,
                            'title' => $visitor,
                            'value' => $Topic->visits,
                        ];
                    }

                    // photos
                    $Photos = [];
                    foreach ($Topic->photos as $photo) {
                        $Photos[] = [
                            'id' => $photo->id,
                            'title' => $photo->title,
                            'url' => ($photo->file != "") ? url("") . "/uploads/topics/" . $photo->file : null,
                            'href' => "/topic/photo/" . $photo->id
                        ];
                    }
                    // maps
                    $Maps = [];
                    foreach ($Topic->maps as $map) {

                        if ($map->$title_var != "") {
                            $map_title = $map->$title_var;
                        } else {
                            $map_title = $map->$title_var2;
                        }
                        if ($map->$details_var != "") {
                            $map_details = $map->$details_var;
                        } else {
                            $map_details = $map->$details_var2;
                        }

                        $Maps[] = [
                            'id' => $map->id,
                            'longitude' => $map->longitude,
                            'latitude' => $map->latitude,
                            'title' => $map_title,
                            'details' => $map_details,
                            'href' => "/topic/map/" . $map->id
                        ];
                    }
                    // attach files
                    $Attach_files = [];
                    foreach ($Topic->attachFiles as $attachFile) {
                        if ($attachFile->$title_var != "") {
                            $attachFile_title = $attachFile->$title_var;
                        } else {
                            $attachFile_title = $attachFile->$title_var2;
                        }
                        if ($attachFile->$file_var != "") {
                            $attachFile_file = $attachFile->$file_var;
                        } else {
                            $attachFile_file = $attachFile->$file_var2;
                        }
                        $Attach_files[] = [
                            'id' => $attachFile->id,
                            'title' => $attachFile_title,
                            'url' => ($attachFile_file != "") ? url("") . "/uploads/topics/" . $attachFile_file : null,
                            'href' => "/topic/file/" . $attachFile->id
                        ];
                        // $Attach_files[] = [
                        //     'id' => $attachFile->id,
                        //     'title' => $attachFile_title,
                        //     'url' => ($attachFile->file != "") ? url("") . "/uploads/topics/" . $attachFile->file : null,
                        //     'href' => "/topic/file/" . $attachFile->id
                        // ];

                    }
                    // comments
                    $Comments = [];
                    foreach ($Topic->approvedComments as $comment) {
                        $Comments[] = [
                            'id' => $comment->id,
                            'name' => $comment->name,
                            'email' => $comment->email,
                            'date' => $comment->date,
                            'comment' => nl2br($comment->comment),
                            'href' => "/topic/comment/" . $comment->id
                        ];
                    }
                    // related topics
                    $Related_topics = [];
                    foreach ($Topic->relatedTopics as $relatedTopic) {
                        if ($relatedTopic->topic->$title_var != "") {
                            $relatedTopic_title = $relatedTopic->topic->$title_var;
                        } else {
                            $relatedTopic_title = $relatedTopic->topic->$title_var2;
                        }
                        //get details
                        if ($relatedTopic->topic->$details_var != "") {
                            $relatedTopic_details = $relatedTopic->topic->$details_var;
                        } else {
                            $relatedTopic_details = $relatedTopic->topic->$details_var2;
                        }

                        // categories
                        $relatedTopic_joined_categories = $this->getRelated_category($relatedTopic->topic->id, $lang);

$Joined_categories = [];
$Joined_categories_count = 0;

if (!empty($relatedTopic_joined_categories['topic'][0]['Joined_categories'])) {
    $Joined_categories = $relatedTopic_joined_categories['topic'][0]['Joined_categories'];
    $Joined_categories_count = count($Joined_categories);
}

$Related_topics[] = [
    'id' => $relatedTopic->topic->id,
    'title' => $relatedTopic_title,
    'details' => $relatedTopic_details,
    'date' => $relatedTopic->topic->date,
    'expire_date' => $relatedTopic->topic->expire_date,
    'visits' => $relatedTopic->topic->visits,
    'Joined_categories_count' => $Joined_categories_count,
    'Joined_categories' => $Joined_categories,
    'href' => ($relatedTopic->topic->id != config('dev.app.cover_page_tourism'))
        ? $route . $relatedTopic->topic->id
        : config('dev.app.tourism_areas'),
    'photo_file' => ($relatedTopic->topic->photo_file != "")
        ? url("") . "/uploads/topics/" . $relatedTopic->topic->photo_file
        : null,
];
                    }

                    $video_file = $Topic->video_file;
                    if ($Topic->video_type == 0) {
                        $video_file = ($Topic->video_file != "") ? url("") . "/uploads/topics/" . $Topic->video_file : "";
                    }

                    if ($Topic->$title_var != "") {
                        $Topic_title = $Topic->$title_var;
                    } else {
                        $Topic_title = $Topic->$title_var2;
                    }
                    if ($Topic->$details_var != "") {
                        $Topic_details = $Topic->$details_var;
                    } else {
                        $Topic_details = $Topic->$details_var2;
                    }

                    //get header title for Accountability
                    $accountability_lang = config('dev.app.mobile_url');
                    $header_title = ($accountability_lang[$lang] ?? $accountability_lang['en']);

                    $response_details[] = [
                        'id' => $Topic->id,
                        'header_title' => $header_title,
                        'title' => $Topic_title,
                        'details' => $Topic_details,
                        'date' => $Topic->date 
                                    ? \Carbon\Carbon::parse($Topic->date)->format('Y-m-d') 
                                    : null,
                        'expire_date' => $Topic->expire_date,
                        'video_type' => $Topic->video_type,
                        'video_file' => $video_file,
                        'photo_file' => ($Topic->photo_file != "") ? url("") . "/uploads/topics/" . $Topic->photo_file : null,
                        'audio_file' => ($Topic->audio_file != "") ? url("") . "/uploads/topics/" . $Topic->audio_file : null,
                        'attach_file' => ($Topic->attach_file != "") ? url("") . "/uploads/topics/" . $Topic->attach_file : null,
                        'icon' => $Topic->icon,
                        'visits' => $Topic->visits,
                        // 'href' => "topic/" . $Topic->id,
                        'href' => $route != "/default/" ? $route : $route . $Topic->id,
                        'fields_count' => count($Additional_fields),
                        'fields' => $Additional_fields,
                        'Joined_categories_count' => count($Joined_categories),
                        'Joined_categories' => $Joined_categories,
                        'photos_count' => count($Photos),
                        'photos' => $Photos,
                        'attach_files_count' => count($Attach_files),
                        'attach_files' => $Attach_files,
                        'maps_count' => count($Maps),
                        'maps' => $Maps,
                        'comments_count' => count($Comments),
                        'comments' => $Comments,
                        'related_topics_count' => count($Related_topics),
                        'related_topics' => $Related_topics,
                        'user' => [
                            'id' => $Topic->user->id,
                            'name' => $Topic->user->name,
                            'href' => "user/" . $Topic->user->id . "/topics",
                        ]

                    ];

                }
                // Response MSG
                $response = [
                    'msg' => 'Details of topic',
                    'section_id' => $section_id,
                    'section_title' => $section_title,
                    'type' => $type,
                    'topic' => $response_details
                ];
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Topic there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Topic there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    public function categories($section_id, $lang = '', $ids = [0], $route = "topics/cat/")
    {
        // not_into_id for not get current category
        if ($section_id > 0) {
            $WebmasterSection = WebmasterSection::find($section_id);
            if (!empty($WebmasterSection)) {
                // if private redirect back to home
                if ($WebmasterSection->type == 4 || $WebmasterSection->type == 7) {
                    // Empty MSG
                    $response = [
                        'msg' => 'Categories there is no data'
                    ];
                    //return response()->json($response, 404);
                    return $response;
                }
            }

            // Get categories
            //if(config('dev.app.legal_document_section') == $section_id){
                //$Sections = Section::where('webmaster_id', $section_id)->where('father_id', '0')->where('status', 1)->whereIn('id', $ids)->orderby('row_no', 'DESC')->get();
            $Sections = Section::where('webmaster_id', $section_id)->where('father_id', '0')->where('status', 1)->orderby('row_no', 'DESC')->get();
            //}else{
                //$Sections = Section::where('webmaster_id', $section_id)->where('father_id', '0')->where('status', 1)->whereNotIn('id', $ids)->orderby('row_no', 'DESC')->get();
            //}

            if (count($Sections) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $title_var2 = "title_" . config('smartend.default_language');
                $type = "";
                $section_title = "";

                // Response Details
                $response_details = [];
                foreach ($Sections as $Section) {
                    $type = $Section->webmasterSection->type;
                    if ($Section->webmasterSection->$title_var != "") {
                        $section_title = $Section->webmasterSection->$title_var;
                    } else {
                        $section_title = $Section->webmasterSection->$title_var2;
                    }

                    $SubSections = Section::where('webmaster_id', $section_id)->where('father_id', $Section->id)->where('status', 1)->orderby('row_no', 'DESC')->get();
                    $sub_response_details = [];
                    foreach ($SubSections as $SubSection) {
                        if ($SubSection->$title_var != "") {
                            $SubCat_title = $SubSection->$title_var;
                        } else {
                            $SubCat_title = $SubSection->$title_var2;
                        }
                        $sub_response_details[] = [
                            'id' => $SubSection->id,
                            'title' => $SubCat_title,
                            'icon' => $SubSection->icon,
                            'photo' => ($SubSection->photo != "") ? url("") . "/uploads/sections/" . $SubSection->photo : null,
                            'href' => $route . $SubSection->id,
                        ];
                    }
                    if ($Section->$title_var != "") {
                        $cat_title = $Section->$title_var;
                    } else {
                        $cat_title = $Section->$title_var2;
                    }
                    $response_details[] = [
                        'id' => $Section->id,
                        'title' => $cat_title,
                        'icon' => $Section->icon,
                        'photo' => ($Section->photo != "") ? url("") . "/uploads/sections/" . $Section->photo : null,
                        'href' => $route . $Section->id,
                        'sub_categories_count' => count($SubSections),
                        'sub_categories' => $sub_response_details
                    ];

                }
                // Response MSG
                $response = [
                    'msg' => 'List of Categories',
                    'section_id' => $section_id,
                    'section_title' => $section_title,
                    'type' => $type,
                    'categories_count' => count($Sections),
                    'route' => $route,
                    'categories' => $response_details
                ];
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Categories there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Categories there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    public function category($cat_id, $page_number = 1, $topics_count = 0, $lang = '', $route = "topic/")
    {
        if ($cat_id > 0) {
            if ($page_number < 1) {
                $page_number = 1;
            }
            Paginator::currentPageResolver(function () use ($page_number) {
                return $page_number;
            });

            $category_topics = array();
            $TopicCategories = TopicCategory::where('section_id', $cat_id)->orderBy('id', 'desc')->get();
            foreach ($TopicCategories as $category) {
                $category_topics[] = $category->topic_id;
            }

            // $Topics = Topic::where(function ($q) {
            //     $q->where([['status', 1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['status', 1], ['expire_date', null]]);
            // })->whereIn('id', $category_topics)->orderby('row_no', config('dev.app.frontend_topics_order'))->orderby('id', config('dev.app.frontend_topics_order'));

            $Topics = Topic::where(function ($q) {
                $q->where([['status', 1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['status', 1]]);
            })->whereIn('id', $category_topics)->orderby('row_no', config('dev.app.frontend_topics_order'))->orderby('id', config('dev.app.frontend_topics_order'));

            if ($topics_count > 0) {
                $Topics = $Topics->paginate($topics_count);
                // Generate pagination links
                $links = $this->generatePaginationLinks($Topics);
            } else {
                $Topics = $Topics->get();
                $links = [];
            }

            if (count($Topics) > 0) {
                // By Language
                $lang = $this->getLanguage($lang);
                $title_var = "title_$lang";
                $title_var2 = "title_" . config('smartend.default_language');
                $details_var = "details_$lang";
                $details_var2 = "details_" . config('smartend.default_language');
                $cat_title = "";
                $section_title = "";

                $CurrentCategory = Section::find($cat_id);
                if (!empty($CurrentCategory)) {
                    $cat_title = $CurrentCategory->$title_var;
                }

                // Response Details
                $response_details = [];
                foreach ($Topics as $Topic) {
                    if ($Topic->webmasterSection->$title_var != "") {
                        $section_title = $Topic->webmasterSection->$title_var;
                    } else {
                        $section_title = $Topic->webmasterSection->$title_var2;
                    }

                    $Additional_fields = [];
                    $Joined_categories = [];
                    foreach ($Topic->categories as $category) {
                        if ($category->section->$title_var != "") {
                            $Cat_title = $category->section->$title_var;
                        } else {
                            $Cat_title = $category->section->$title_var2;
                        }
                        $Joined_categories[] = [
                            'id' => $category->section_id,
                            'title' => $Cat_title,
                            'icon' => $category->section->icon,
                            'photo' => ($category->section->photo != "") ? url("") . "/uploads/sections/" . $category->section->photo : null,
                            'href' => "topics/cat/" . $category->section_id
                        ];

                        //get types
                        if(count($Topic->webmasterSection->customFields->where("in_listing", true)) >= 8)
                        {
                            $types = config('dev.app.types');
                            $type = ($types[$lang] ?? $types['en']);
                            $Additional_fields[] = [
                                'type' => 0,
                                'title' => $type,
                                'value' => $Cat_title,
                            ];
                        }
                    }

                    // additional fields
                    //$Additional_fields = [];
                    foreach ($Topic->webmasterSection->customFields->where("in_listing", true) as $customField) {
                        if ($customField->in_page) {

                            $cf_saved_val = "";
                            $cf_saved_val_array = array();
                            if (count($Topic->fields) > 0) {
                                foreach ($Topic->fields as $t_field) {
                                    if ($t_field->field_id == $customField->id) {
                                        if ($customField->type == 7) {
                                            // if multi check
                                            $cf_saved_val_array = explode(", ", $t_field->field_value);
                                            $cf_details_var = "details_" . @Helper::currentLanguage()->code;
                                            $cf_details_var2 = "details_" . config('smartend.default_language');
                                            if ($customField->$cf_details_var != "") {
                                                $cf_details = $customField->$cf_details_var;
                                            } else {
                                                $cf_details = $customField->$cf_details_var2;
                                            }
                                            $cf_details_lines = preg_split('/\r\n|[\r\n]/', $cf_details);
                                            $line_num = 1;
                                            foreach ($cf_details_lines as $cf_details_line) {
                                                if (in_array($line_num, $cf_saved_val_array)) {
                                                    $cf_saved_val .= $cf_details_line . ", ";
                                                }
                                                $line_num++;
                                            }
                                            $cf_saved_val = substr($cf_saved_val, 0, -2);
                                        } else {
                                            $cf_saved_val = $t_field->field_value;
                                        }
                                    }
                                }
                            }

                            if (($cf_saved_val != "" || count($cf_saved_val_array) > 0) && ($customField->lang_code == "all" || $customField->lang_code == "$lang")) {
                                if (Str::endsWith($customField->$title_var, "_$lang") || !Str::contains($customField->$title_var, '_')) {
                                    $Additional_fields[] = [
                                        'type' => $customField->type,
                                        'title' => explode('_', $customField->$title_var)[0],
                                        'value' => $cf_saved_val,
                                    ];
                                }
                            }
                        }
                    }

                    //get visitors
                    if(count($Topic->webmasterSection->customFields->where("in_listing", true)) >= 8)
                    {
                        $visitors = config('dev.app.visitors');
                        $visitor = ($visitors[$lang] ?? $visitors['en']);
                        $Additional_fields[] = [
                            'type' => 0,
                            'title' => $visitor,
                            'value' => $Topic->visits,
                        ];
                    }

                    $video_file = $Topic->video_file;
                    if ($Topic->video_type == 0) {
                        $video_file = ($Topic->video_file != "") ? url("") . "/uploads/topics/" . $Topic->video_file : "";
                    }
                    if ($Topic->$title_var != "") {
                        $Topic_title = $Topic->$title_var;
                    } else {
                        $Topic_title = $Topic->$title_var2;
                    }
                    if ($Topic->$details_var != "") {
                        $Topic_details = $Topic->$details_var;
                    } else {
                        $Topic_details = $Topic->$details_var2;
                    }
                    $response_details[] = [
                        'id' => $Topic->id,
                        'title' => $Topic_title,
                        'details' => $Topic_details,
                        'date' => $Topic->date 
                                    ? \Carbon\Carbon::parse($Topic->date)->format('Y-m-d') 
                                    : null,
                        'expire_date' => $Topic->expire_date,
                        'video_type' => $Topic->video_type,
                        'video_file' => $video_file,
                        'photo_file' => ($Topic->photo_file != "") ? url("") . "/uploads/topics/" . $Topic->photo_file : null,
                        'audio_file' => ($Topic->audio_file != "") ? url("") . "/uploads/topics/" . $Topic->audio_file : null,
                        'icon' => $Topic->icon,
                        'visits' => $Topic->visits,
                        'href' => $route . $Topic->id,
                        'fields_count' => count($Additional_fields),
                        'fields' => $Additional_fields,
                        'Joined_categories_count' => count($Topic->categories),
                        'Joined_categories' => $Joined_categories,
                        'user' => [
                            'id' => $Topic->user->id,
                            'name' => $Topic->user->name,
                            'href' => "user/" . $Topic->user->id . "/topics",
                        ]

                    ];

                }

                if ($topics_count > 0) {
                    // Response MSG
                    $response = [
                        'msg' => 'List of Topics',
                        'route' => '',
                        'section_title' => $section_title,
                        'cat_id' => $cat_id,
                        'cat_title' => $cat_title,
                        'topics_count' => $Topics->count(),
                        'current_page' => $Topics->currentPage(),
                        'last_page' => $Topics->lastPage(),
                        'next_page_url' => $Topics->nextPageUrl(),
                        'prev_page_url' => $Topics->previousPageUrl(),
                        'first_page_url' => $Topics->url(1),
                        'last_page_url' => $Topics->url($Topics->lastPage()),
                        'per_page' => $Topics->perPage(),
                        'total' => $Topics->total(),
                        'links' => $links,
                        'topics' => $response_details,
                    ];
                }else{
                    // Response MSG
                    $response = [
                        'msg' => 'List of Topics',
                        'section_title' => $section_title,
                        'cat_id' => $cat_id,
                        'cat_title' => $cat_title,
                        'topics_count' => $Topics->count(),
                        'topics' => $response_details,
                    ];
                }
                //return response()->json($response, 200);
                return $response;
            } else {
                // Empty MSG
                $response = [
                    'msg' => 'Category there is no data'
                ];
                //return response()->json($response, 200);
                return $response;
            }
        } else {
            // Empty MSG
            $response = [
                'msg' => 'Category there is no data'
            ];
            //return response()->json($response, 404);
            return $response;
        }
    }

    public function search_topic($search_word, $lang = '')
    {
        $route = config('dev.app.search_route');
        $lang = $this->getLanguage($lang);
        $WebmasterSection = WebmasterSection::where('status', 1)->where("seo_url_slug_" . $lang, $route)->first();
        if ($search_word != "") {
            // remove any symbol
            $search_word = preg_replace('/[^\p{L}\p{N}\p{M}\s]/u', '', $search_word);
        }

        // categories list
        if ($search_word != "" && $WebmasterSection->id == 1) {
            // general search
            $CategoriesList = [];
        } else {
            $CategoriesList = Section::where('webmaster_id', '=', $WebmasterSection->id)->where('father_id', '=', '0')->where('status', 1)->orderby('webmaster_id', 'DESC')->orderby('row_no', 'DESC')->get();
        }

        $TopicsList = [];
        $MostViewedTopics = [];
        if ($WebmasterSection->type != 8 && $WebmasterSection->type != 7) {
            // topics list
            if ($search_word != "" && $WebmasterSection->id == 1) {
                //general search
                $TopicsList = Topic::where(function ($query) {
                    $query->where([['status', 1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['status', 1], ['expire_date', null]]);
                });
            } else {
                $TopicsList = Topic::where(function ($query) use ($WebmasterSection) {
                    $query->where([['webmaster_id', '=', $WebmasterSection->id], ['status',
                        1], ['expire_date', '>=', date("Y-m-d")], ['expire_date', '<>', null]])->orWhere([['webmaster_id', '=', $WebmasterSection->id], ['status', 1], ['expire_date', null]]);
                });
            }

            // search word
            if ($search_word != "") {
                $topics_ids = TopicField::select("topic_id")->where("field_value", 'like', '%' . $search_word . '%');

                $TopicsList = $TopicsList->where(function ($query) use ($search_word, $topics_ids) {
                    $query->where('title_' . Helper::currentLanguage()->code, 'like', '%' . $search_word . '%')
                        ->orwhere('seo_title_' . Helper::currentLanguage()->code, 'like', '%' . $search_word . '%')
                        ->orwhere('details_' . Helper::currentLanguage()->code, 'like', '%' . $search_word . '%')
                        ->orwherein("id", $topics_ids);
                });
            }

            $MostViewedTopics = clone $TopicsList;

            // order and paginate
            $TopicsList = $TopicsList->orderby('date', config('dev.app.frontend_topics_order'))->orderby('id', config('dev.app.frontend_topics_order'))->paginate(config('dev.app.frontend_pagination'));

            // Get Most Viewed Topics
            $MostViewedTopics = $MostViewedTopics->orderby('visits', 'desc')->limit(config('dev.app.mostviewedtopics_limit'))->get();

            //
            $links = $this->generatePaginationLinks($TopicsList);

            //get clean data
            $TopicsListDetail = $this->clean_data($TopicsList, $lang, config('dev.app.news_route'));

            //get clean data
            $MostViewedDetail = $this->clean_data($MostViewedTopics, $lang, config('dev.app.news_route'));
        }

        // Response MSG
        $response= [
            'msg' => 'List of Topics',
            'route' => config('dev.app.news_route'),
            'search_word' => $search_word,
            'topics_count' => $TopicsList->count(),
            'current_page' => $TopicsList->currentPage(),
            'last_page' => $TopicsList->lastPage(),
            'next_page_url' => $TopicsList->nextPageUrl(),
            'prev_page_url' => $TopicsList->previousPageUrl(),
            'first_page_url' => $TopicsList->url(1),
            'last_page_url' => $TopicsList->url($TopicsList->lastPage()),
            'per_page' => $TopicsList->perPage(),
            'total' => $TopicsList->total(),
            'links' => $links,
            'topics' => $TopicsListDetail,
            'mostviewedtopics' => $MostViewedDetail
        ];
        return $response;
        
    }

    //get home
    public function index($lang = '')
    {
        $page_number =1;
        //get header and footer menu
        $header_menu = $this->menu(config('dev.app.header_menu_id'), $lang);
        $footer_menu = $this->menu(config('dev.app.footer_menu_id'), $lang);

        //get Banners
        $banners = $this->banners(config('dev.app.banner_group_id'), $lang);

        //get about page
        $about_page = $this->topic(config('dev.app.about_page'), $lang, "/default/1");

        //get about ncdd
        $about_ncdd = $this->topic(config('dev.app.about_ncdd'), $lang, "/default/1086");

        //get welcome
        $welcome = $this->topics(config('dev.app.welcome_section'), $page_number, config('dev.app.welcome_pagination'), $lang);

        //get cards top
        $cards_top = $this->category(config('dev.app.cards_top'), $page_number, config('dev.app.cards_pagination'), $lang);

        //get cards center
        $cards_center = $this->category(config('dev.app.cards_center'), $page_number, config('dev.app.cards_pagination'), $lang);

        //get cards cards_bottom
        $cards_bottom = $this->category(config('dev.app.cards_bottom'), $page_number, config('dev.app.cards_pagination'), $lang);

        //get news
        $news = $this->topics(config('dev.app.news_section'), 1, config('dev.app.news_home_pagination'), $lang, 'desc', config('dev.app.news_route'));

        //get prakas
        $announcement = $this->category(config('dev.app.announcement'), $page_number, config('dev.app.announcement_pagination'), $lang, config('dev.app.opportunities_detail_route'));
        $announcement['route'] = config('dev.app.opportunities_route') . config('dev.app.announcement');

        //get project info
        $projects = $this->topics(config('dev.app.projects_section'), $page_number, config('dev.app.projects_home_pagination'), $lang, 'desc', config('dev.app.projects_route'));

        //get sounds
        $sounds = $this->topics(config('dev.app.sounds_section'), $page_number, config('dev.app.sounds_home_pagination'), $lang, 'desc');

        //get videos
        $videos = $this->topics(config('dev.app.videos_section'), $page_number, config('dev.app.videos_home_pagination'), $lang, 'desc', config('dev.app.videos_detail_route'));

        //get text_running
        $text_running = $this->topics(config('dev.app.text_running_section'), $page_number, config('dev.app.text_running_home_pagination'), $lang);

        //get mobile url
        $mobile_url = $this->topics(config('dev.app.mobile_url_section'), $page_number, config('dev.app.mobile_url_pagination'), $lang);

        //get contacts & style & social
        $website_contacts = $this->website_contacts($lang);

        // Response MSG
        $response = [
            'msg' => 'List of Home Pages',
            'header_menu' => $header_menu,
            'footer_menu' => [$footer_menu, $website_contacts],
            'banners' => $banners,
            'abouts' => ['about_page' => $about_page, 'cards_top' => $cards_top],
            'management' => $welcome,
            'cards' => ['cards_center' => $cards_center, 'cards_bottom' => $cards_bottom],
            'news' => $news,
            'prakas' => $announcement,
            'projects' => $projects,
            'sounds' => $sounds,
            'videos' => $videos,
            'text_running' => $text_running,
            'mobile_url'   => $mobile_url,
            'ncdd'   => $about_ncdd,
        ];
        return response()->json($response, 200);
    }

    public function info($lang = '')
    {
        //get contacts & style & social
        $website_contacts = $this->website_contacts($lang);

        $website_status = $this->website_status();

        $website_info = $this->website_info($lang);

        // Loop through website_info['details'] and assign properly
        foreach ($website_info['details'] as $key => $value) {
            $website_contacts['details']['style']['details'][$key] = $value;
        }
        
        $website_contacts['details']['style']['details']['status'] = $website_status['details']['status'];
        
        // Response MSG
        $response = [
            'msg' => 'Logo Info',
            'info' => $website_contacts['details']['style']['details'],
            
        ];
        return response()->json($response, 200);
    }

    //get News
    public function news(Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_news'), $lang);

        //get tourism_areas
        $news = $this->topics(config('dev.app.news_section'), $page_number, config('dev.app.news_pagination'), $lang, 'desc', config('dev.app.news_route'));

        //get categories
        $ids [] = 0;
        $categories = $this->categories(config('dev.app.news_section'), $lang, $ids , config('dev.app.news_cat_route'));

        // Response MSG
        $response = [
            //'cover_page' => $cover_page,
            'route' => config('dev.app.news_route'),
            'results' => $news,
            'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function new($topic_id, $lang = '')
    {
        //get detail
        $new = $this->topic($topic_id, $lang, config('dev.app.news_route'));

        //get category ids
        //$ids = isset($new['topic'][0]['Joined_categories']) ? array_column($new['topic'][0]['Joined_categories'], 'id') : [];

        //get categories
        //$categories = $this->categories(config('dev.app.news_section'), $lang, $ids);

        // Response MSG
        $response = [
            'results' => $new,
            //'relatedTopic' => $categories
            'relatednva' => $this->relatednva($lang)          
        ];
        return response()->json($response, 200);
    }

    public function news_category($cat_id, Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get detail
        $news_category = $this->category($cat_id, $page_number, config('dev.app.news_pagination'), $lang, config('dev.app.news_route'));

        //get category ids
        //$ids = isset($news_category['cat_id'])? array_map('intval', (array) $news_category['cat_id']) : [];

        //get categories
        //$categories = $this->categories(config('dev.app.news_section'), $lang, $ids);
        $ids [] = 0;
        $categories = $this->categories(config('dev.app.news_section'), $lang, $ids , config('dev.app.news_cat_route'));


        // Response MSG
        $response = [
            'route' => config('dev.app.news_route'),
            'results' => $news_category,
            'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get legal-documents
    public function legal_documents(Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_legal_document'), $lang);

        //get legal_documents
        $legal_documents = $this->topics(config('dev.app.legal_document_section'), $page_number, config('dev.app.legal_documents_pagination'), $lang, 'desc', config('dev.app.legal_documents_detail_route'));

        //get categories
        $ids [] = 0;
        $categories = $this->categories(config('dev.app.legal_document_section'), $lang, $ids, config('dev.app.legal_documents_route'));

        // Response MSG
        $response = [
            //'cover_page' => $cover_page,    
            'results' => $legal_documents,
            'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function legal_document($topic_id, $lang = '')
    {
        //get detail
        $legal_document = $this->topic($topic_id, $lang, config('dev.app.legal_documents_detail_route'));

        //get category ids
        //$ids = isset($legal_document['topic'][0]['Joined_categories']) ? array_column($legal_document['topic'][0]['Joined_categories'], 'id') : [];

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang, $ids);

        // Response MSG
        $response = [
            'results' => $legal_document,
            //'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function legal_documents_category($cat_id, Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_legal_document'), $lang);

        //get detail
        $legal_documents_category = $this->category($cat_id, $page_number, config('dev.app.legal_documents_pagination'), $lang, config('dev.app.legal_documents_detail_route'));

        //get category ids
        //$ids = isset($legal_documents_category['cat_id'])? array_map('intval', (array) $legal_documents_category['cat_id']) : [];
        $ids [] = 0;
        // $ids [] = $cat_id;
        // if($cat_id == config('dev.app.decision') || $cat_id == config('dev.app.decision_sub_nation')){
        //     $ids [] = config('dev.app.main_decision');
        // }else if($cat_id == config('dev.app.instuction') || $cat_id == config('dev.app.instuction_sub_nation')){
        //     $ids [] = config('dev.app.main_instuction');
        // }

        //get categories
        $categories = $this->categories(config('dev.app.legal_document_section'), $lang, $ids, config('dev.app.legal_documents_route'));

        //change title
        // $filelibrary = config('dev.app.filelibrary');
        // $cover_page['topic'][0]['title'] = ($filelibrary[$lang] ?? $filelibrary['en']) . $categories['categories'][0]['title'];
        

        // Response MSG
        $response = [
            //'cover_page' => $cover_page,
            'results' => $legal_documents_category,
            'relatedTopic' => $categories,
            //'sub_link' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get announcements
    public function opportunities(Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get opportunities
        $opportunities = $this->category(config('dev.app.announcement'), $page_number, config('dev.app.opportunities_pagination'), $lang, config('dev.app.opportunities_detail_route'));

        //get categories
        $categories = $this->categories(config('dev.app.opportunities_section'), $lang);

        // Response MSG
        $response = [   
            'results' => $opportunities,
            'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function opportunity($topic_id, $lang = '')
    {
        //get detail
        $opportunities = $this->topic($topic_id, $lang, config('dev.app.opportunities_detail_route'));

        //get category ids
        //$ids = isset($legal_document['topic'][0]['Joined_categories']) ? array_column($legal_document['topic'][0]['Joined_categories'], 'id') : [];

        //get categories
        $categories = $this->categories(config('dev.app.opportunities_section'), $lang);
        //$categories = $this->categories(config('dev.app.opportunities_section'), $lang, $ids);

        // Response MSG
        $response = [
            'results' => $opportunities,
            //'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function opportunity_category($cat_id, Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_legal_document'), $lang);

        //get detail
        $opportunity_category = $this->category($cat_id, $page_number, config('dev.app.opportunities_pagination'), $lang, config('dev.app.opportunities_detail_route'));

        //get category ids
        //$ids = isset($legal_documents_category['cat_id'])? array_map('intval', (array) $legal_documents_category['cat_id']) : [];
        // $ids [] = $cat_id;
        $ids [] = 0;
        // if($cat_id == config('dev.app.decision') || $cat_id == config('dev.app.decision_sub_nation')){
        //     $ids [] = config('dev.app.main_decision');
        // }else if($cat_id == config('dev.app.instuction') || $cat_id == config('dev.app.instuction_sub_nation')){
        //     $ids [] = config('dev.app.main_instuction');
        // }

        //get categories
        $categories = $this->categories(config('dev.app.opportunities_section'), $lang, $ids, config('dev.app.opportunities_route'));

        //change title
        // $filelibrary = config('dev.app.filelibrary');
        // $cover_page['topic'][0]['title'] = ($filelibrary[$lang] ?? $filelibrary['en']) . $categories['categories'][0]['title'];
        

        // Response MSG
        $response = [
            'results' => $opportunity_category,
            'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }
    // project category
    public function projects_category($cat_id, Request $request)
    {                
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get detail
        $project_category = $this->category($cat_id, $page_number, config('dev.app.projects_pagination'), $lang, config('dev.app.projects_detail_route'));        
        $ids [] = 0;
        
        //get categories
        $categories = $this->categories(config('dev.app.projects_section'), $lang, $ids, config('dev.app.projects_route'));

        //change title
        // $filelibrary = config('dev.app.filelibrary');
        // $cover_page['topic'][0]['title'] = ($filelibrary[$lang] ?? $filelibrary['en']) . $categories['categories'][0]['title'];
        
        // Response MSG
        $response = [
            'results' => $project_category,
            'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }
    //get projects
    public function projects(Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_legal_document'), $lang);

        //get legal_documents
        $projects = $this->topics(config('dev.app.projects_section'), $page_number, config('dev.app.projects_pagination'), $lang, 'DESC', config('dev.app.projects_route'));

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang);

        // Response MSG
        $response = [
            //'cover_page' => $cover_page,    
            'results' => $projects,
            //'relatedTopic' => $categories
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function project($topic_id, $lang = '')
    {
        //get detail
        $project = $this->topic($topic_id, $lang, config('dev.app.projects_route'));

        //get category ids
        //$ids = isset($legal_document['topic'][0]['Joined_categories']) ? array_column($legal_document['topic'][0]['Joined_categories'], 'id') : [];

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang, $ids);

        // Response MSG
        $response = [
            'results' => $project,
            //'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get sounds
    public function sounds(Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_legal_document'), $lang);

        //get sounds
        $sounds = $this->topics(config('dev.app.sounds_section'), $page_number, config('dev.app.sounds_pagination'), $lang, 'desc');

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang);

        //change section title
        $filelibrary = config('dev.app.filelibrary');
        $sounds['section_title'] = ($filelibrary[$lang] ?? $filelibrary['en']) . $sounds['section_title'];

        // Response MSG
        $response = [
            //'cover_page' => $cover_page,    
            'results' => $sounds,
            //'relatedTopic' => $categories
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function sound($topic_id, $lang = '')
    {
        //get detail
        $sound = $this->topic($topic_id, $lang);

        //get category ids
        //$ids = isset($legal_document['topic'][0]['Joined_categories']) ? array_column($legal_document['topic'][0]['Joined_categories'], 'id') : [];

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang, $ids);

        // Response MSG
        $response = [
            'results' => $sound,
            //'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get sounds
    public function videos(Request $request)
    {
        $page_number = $request->input('page', 1);
        $lang = $request->input('lang', '');

        //get cover page
        //$cover_page = $this->topic(config('dev.app.cover_page_legal_document'), $lang);

        //get videos
        $videos = $this->topics(config('dev.app.videos_section'), $page_number, config('dev.app.videos_pagination'), $lang, 'desc', config('dev.app.videos_detail_route'));

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang);

        // Response MSG
        $response = [
            //'cover_page' => $cover_page,    
            'results' => $videos,
            //'relatedTopic' => $categories
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    public function video($topic_id, $lang = '')
    {
        //get detail
        $videos = $this->topic($topic_id, $lang, config('dev.app.videos_detail_route'));

        //get category ids
        //$ids = isset($legal_document['topic'][0]['Joined_categories']) ? array_column($legal_document['topic'][0]['Joined_categories'], 'id') : [];

        //get categories
        //$categories = $this->categories(config('dev.app.legal_document_section'), $lang, $ids);

        // Response MSG
        $response = [
            'results' => $videos,
            //'relatedTopic' => $categories,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get contact-us
    public function contact_us($lang = '')
    {
        //get detail
        $page = $this->topic(config('dev.app.contact_us_page'), $lang);

        //get contacts & style & social
        //$website_contacts = $this->website_contacts($lang);

        // Response MSG
        $response = [
            'results' => $page,
            //'website_contacts' => $website_contacts,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get detail page
    public function page($topic_id, $lang = '')
    {
        $page_number =1;

        //get detail
        $page = $this->topic($topic_id, $lang);

        // Response MSG
        $response = [
            'results'    => $page,
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }

    //get detail page
    public function dashboard($topic_id, $lang = '')
    {
        $page_number =1;

        //get detail
        $page = $this->topic($topic_id, $lang);

        // Response MSG
        $response = [
            'results'    => $page,
        ];
        return response()->json($response, 200);
    }


    //get search data
    public function search(Request $request)
    {
        $search_word = $request->input('search_word');
        $lang = $request->input('lang');
        $topics = $this->search_topic($search_word, $lang);
        // Response MSG
        $response = [
            'results' => $topics
        ];
        return response()->json($response, 200);
    }

    //get about 
    public function about($lang = '')
    {
        //get detail
        $page = $this->topic(config('dev.app.about_page'), $lang);

        //get tourism_areas
        //$tourism_areas = $this->topics(config('dev.app.tourism_areas_section'), 1, config('dev.app.tourism_areas_pagination'), $lang, 'desc', config('dev.app.tourism_areas_route'));

        // Response MSG
        $response = [
            'results' => $page ,
            //'relatedTopic' => $tourism_areas
            'relatednva' => $this->relatednva($lang)
        ];
        return response()->json($response, 200);
    }
}
