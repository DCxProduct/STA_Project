<div class="app-footer">
    <div class="p-a text-xs">
        <div class="pull-right text-muted">
            <?php
            $site_title_var = "site_title_" . @Helper::currentLanguage()->code;
            ?>
            &copy; <?php echo date("Y") ?> {{ __('frontend.AllRightsReserved') }}
            . <a href="{{ url('/') }}">{{Helper::GeneralSiteSettings($site_title_var)}}</a>
            
        </div>
        <div class="nav">
            &nbsp;
        </div>
    </div>
</div>
