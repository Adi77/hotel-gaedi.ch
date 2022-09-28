<?php
/**
 * Timber starter-theme
 * https://github.com/timber/starter-theme
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

/**
 * If you are installing Timber as a Composer dependency in your theme, you'll need this block
 * to load your dependencies and initialize Timber. If you are using Timber via the WordPress.org
 * plug-in, you can safely delete this block.
 */
$composer_autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($composer_autoload)) {
    require_once $composer_autoload;
    $timber = new Timber\Timber();
}

/**
 * This ensures that Timber is loaded and available as a PHP class.
 * If not, it gives an error message to help direct developers on where to activate
 */
if (! class_exists('Timber')) {
    add_action(
        'admin_notices',
        function () {
            echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
        }
    );

    add_filter(
        'template_include',
        function ($template) {
            return get_stylesheet_directory() . '/static/no-timber.html';
        }
    );
    return;
}

/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );

/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;




/**
 * Enqueue scripts and styles.
 */
function hotelgaedi_theme_scripts()
{
    switch (wp_get_environment_type()) {
        case 'local':
            case 'development':
            // load assets (dev)
                wp_enqueue_script('hotelgaedi_theme-scripts-dev', 'http://'. getenv('VIRTUAL_HOST'). ':8080/site.js', array(), null, true);
                //wp_enqueue_script('hotelgaedi_theme-admin-scripts-dev', 'http://localhost:8080/admin.js');
          break;
          case 'staging':
            // load assets (staging)
            wp_enqueue_style('hotelgaedi_theme-style', get_stylesheet_directory_uri() . '/dist/site.css');
            wp_enqueue_script('hotelgaedi_theme-scripts', get_stylesheet_directory_uri() . '/dist/site.js', array(), null, true);
            //wp_enqueue_script('hotelgaedi_theme-admin-scripts', get_stylesheet_directory_uri() . '/dist/admin.js');
          break;
          case 'production':
        default:
            // load assets (prod)
                wp_enqueue_style('hotelgaedi_theme-style', get_stylesheet_directory_uri() . '/dist/site.css');
                wp_enqueue_script('hotelgaedi_theme-scripts', get_stylesheet_directory_uri() . '/dist/site.js', array(), null, true);
                //wp_enqueue_script('hotelgaedi_theme-admin-scripts', get_stylesheet_directory_uri() . '/dist/admin.js');
          break;
      }
}
add_action('wp_enqueue_scripts', 'hotelgaedi_theme_scripts', 9999);



/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array( $this, 'theme_supports' ));
        add_filter('timber/context', array( $this, 'add_to_context' ));
        //add_filter('timber/twig', array( $this, 'add_to_twig' ));
        add_action('init', array( $this, 'register_post_types' ));
        add_action('init', array( $this, 'register_taxonomies' ));
        parent::__construct();
    }



    /** This is where you can register custom post types. */
    public function register_post_types()
    {



        $labels = array(
            'name'                  => _x('Zimmer', 'Post Type General Name', 'text_domain'),
            'singular_name'         => _x('Zimmer', 'Post Type Singular Name', 'text_domain'),
            'menu_name'             => __('Zimmer', 'text_domain'),
            'name_admin_bar'        => __('Zimmer', 'text_domain'),
            'archives'              => __('Zimmer Archiv', 'text_domain'),
            'attributes'            => __('Zimmer Attribute', 'text_domain'),
            'parent_item_colon'     => __('Parent Zimmer:', 'text_domain'),
            'all_items'             => __('Alle Zimmer', 'text_domain'),
            'add_new_item'          => __('Neues Zimmer hinzufügen', 'text_domain'),
            'add_new'               => __('Neues Zimmer', 'text_domain'),
            'new_item'              => __('Neues Element', 'text_domain'),
            'edit_item'             => __('Zimmer bearbeiten', 'text_domain'),
            'update_item'           => __('Zimmer aktualisieren', 'text_domain'),
            'view_item'             => __('Zimmer anzeigen', 'text_domain'),
            'view_items'            => __('Elemente anzeigen', 'text_domain'),
            'search_items'          => __('Zimmer suchen', 'text_domain'),
            'not_found'             => __('Kein Zimmer gefunden', 'text_domain'),
            'not_found_in_trash'    => __('Kein Zimmer gefunden im Papierkorb', 'text_domain'),
            'featured_image'        => __('Featured Image', 'text_domain'),
            'set_featured_image'    => __('Set featured image', 'text_domain'),
            'remove_featured_image' => __('Entferne featured image', 'text_domain'),
            'use_featured_image'    => __('Use as featured image', 'text_domain'),
            'insert_into_item'      => __('Insert into item', 'text_domain'),
            'uploaded_to_this_item' => __('Uploaded to this item', 'text_domain'),
            'items_list'            => __('Items list', 'text_domain'),
            'items_list_navigation' => __('Items list navigation', 'text_domain'),
            'filter_items_list'     => __('Filter items list', 'text_domain'),
        );
        $args = array(
            'label'                 => __('Zimmer', 'text_domain'),
            'description'           => __('Zimmer information.', 'text_domain'),
            'labels'                => $labels,
            'supports'              => array( 'title', 'editor', 'thumbnail', 'revisions', 'custom-fields', 'excerpt' ),
            'taxonomies'            => array( 'category', 'post_tag', 'location', 'type' ),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 5,
            'menu_icon'             => 'dashicons-calendar-alt',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'page',
            'show_in_rest'          => true,
        );
        register_post_type('zimmer', $args);





        $labels = array(
            'name'                  => _x('Packages', 'Post Type General Name', 'text_domain'),
            'singular_name'         => _x('Package', 'Post Type Singular Name', 'text_domain'),
            'menu_name'             => __('Packages', 'text_domain'),
            'name_admin_bar'        => __('Package', 'text_domain'),
            'archives'              => __('Package Archiv', 'text_domain'),
            'attributes'            => __('Package Attribute', 'text_domain'),
            'parent_item_colon'     => __('Parent Package:', 'text_domain'),
            'all_items'             => __('Alle Packages', 'text_domain'),
            'add_new_item'          => __('Neues Package hinzufügen', 'text_domain'),
            'add_new'               => __('Neues Package', 'text_domain'),
            'new_item'              => __('Neues Element', 'text_domain'),
            'edit_item'             => __('Package bearbeiten', 'text_domain'),
            'update_item'           => __('Package aktualisieren', 'text_domain'),
            'view_item'             => __('Package anzeigen', 'text_domain'),
            'view_items'            => __('Elemente anzeigen', 'text_domain'),
            'search_items'          => __('Packages suchen', 'text_domain'),
            'not_found'             => __('Kein Package gefunden', 'text_domain'),
            'not_found_in_trash'    => __('Kein Package gefunden im Papierkorb', 'text_domain'),
            'featured_image'        => __('Featured Image', 'text_domain'),
            'set_featured_image'    => __('Set featured image', 'text_domain'),
            'remove_featured_image' => __('Entferne featured image', 'text_domain'),
            'use_featured_image'    => __('Use as featured image', 'text_domain'),
            'insert_into_item'      => __('Insert into item', 'text_domain'),
            'uploaded_to_this_item' => __('Uploaded to this item', 'text_domain'),
            'items_list'            => __('Items list', 'text_domain'),
            'items_list_navigation' => __('Items list navigation', 'text_domain'),
            'filter_items_list'     => __('Filter items list', 'text_domain'),
        );
        $args = array(
            'label'                 => __('Package', 'text_domain'),
            'description'           => __('Package information.', 'text_domain'),
            'labels'                => $labels,
            'supports'              => array( 'title', 'editor', 'thumbnail', 'revisions', 'custom-fields', 'excerpt' ),
            'taxonomies'            => array( 'category', 'post_tag', 'location', 'type' ),
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => true,
            'menu_position'         => 6,
            'menu_icon'             => 'dashicons-forms',
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => true,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'page',
            'show_in_rest'          => true,
        );
        register_post_type('packages', $args);













    }

    /** This is where you can register custom taxonomies. */
    public function register_taxonomies()
    {
/*         register_taxonomy(
            'zimmer-categories',
            'zimmer',
            array(
                'label' => __( 'Zimmer Kategorien' ),
                'hierarchical' => true,
            )
        );
        register_taxonomy(
            'packages-categories',
            'packages',
            array(
                'label' => __( 'Packages Kategorien' ),
                'hierarchical' => true,
            )
        ); */
    }

    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context($context)
    {
        $context['foo']   = 'bar';
        $context['stuff'] = 'I am a value set in your functions.php file';
        $context['notes'] = 'These values are available everytime you call Timber::context();';
        $context['metamenu']  = new Timber\Menu('Metanav');
        $context['mainmenu']  = new Timber\Menu('main');
        $context['footerwidgetcol1'] = Timber::get_widgets('footerwidgetcol1');
        $context['footerwidgetcol2'] = Timber::get_widgets('footerwidgetcol2');
        $context['footerwidgetcol3'] = Timber::get_widgets('footerwidgetcol3');
        $context['copyrightrow'] = Timber::get_widgets('copyrightrow');
        $context['site']  = $this;
        return $context;
    }

    public function theme_supports()
    {
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );

        /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
        add_theme_support(
            'post-formats',
            array(
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            )
        );

        add_theme_support('menus');


        /* Enable ci/cd styles in Backend */
        add_theme_support('editor-styles');
        add_editor_style('dist/site.css');
    }

    /** This Would return 'foo bar!'.
     *
     * @param string $text being 'foo', then returned 'foo bar!'.
     */
    public function myfoo($text)
    {
        $text .= ' bar!';
        return $text;
    }

    /** This is where you can add your own functions to twig.
     *
     *
     * @param string $twig get extension.
     */
/*     public function add_to_twig($twig)
    {
        $twig->addExtension(new Twig\Extension\StringLoaderExtension());
        $twig->addFilter(new Twig\TwigFilter('myfoo', array( $this, 'myfoo' )));
        return $twig;
    } */
}

new StarterSite();


/**
 * Add Post Class Filter for carousel
 *
**/
add_filter('post_class', 'sk_post_class');

function sk_post_class($classes) {
    if(is_single()) {
        $classes[] = 'carousel-item';
    } 
    return $classes;
}




/**
 * Register footer widgets.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function hotel_gaedi_widgets_init()
{
    register_sidebar(
        array(
            'name'          => __('Footer 1', 'hotel_gaedi'),
            'id'            => 'footerwidgetcol1',
            'description'   => __('Add widgets here to appear in your footer.', 'hotel_gaedi'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );

    register_sidebar(
        array(
            'name'          => __('Footer 2', 'hotel_gaedi'),
            'id'            => 'footerwidgetcol2',
            'description'   => __('Add widgets here to appear in your footer.', 'hotel_gaedi'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );

    register_sidebar(
        array(
            'name'          => __('Footer 3', 'hotel_gaedi'),
            'id'            => 'footerwidgetcol3',
            'description'   => __('Add widgets here to appear in your footer.', 'hotel_gaedi'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );

    register_sidebar(
        array(
            'name'          => __('Copyright Row', 'hotel_gaedi'),
            'id'            => 'copyrightrow',
            'description'   => __('Add widgets here to appear in your footer.', 'hotel_gaedi'),
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>',
        )
    );
}
add_action('widgets_init', 'hotel_gaedi_widgets_init');




// Remove Block vorlagen
add_action('after_setup_theme', 'fire_theme_support');
function fire_theme_support()
{
    remove_theme_support('core-block-patterns');
}

// Remove block suggestions if searching in add block dialog in Gutenberg Backend
function tomjn_remove_block_directory()
{
    wp_add_inline_script(
        'wp-block-editor',
        "wp.domReady( () => wp.plugins.unregisterPlugin( 'block-directory' ) )"
    );
}
add_action('admin_enqueue_scripts', 'tomjn_remove_block_directory');



add_filter('block_type_metadata', 'my_remove_experimental_layout', 10, 1);
function my_remove_experimental_layout($metadata)
{
    if (!empty($metadata['supports']['__experimentalLayout'])) {
        $metadata['supports']['__experimentalLayout'] = false;
    }
    return $metadata;
}



/* add better excerpt field with RTE for Rooms and Package post type */

add_action( 'add_meta_boxes', array ( 'T5_Richtext_Excerpt', 'switch_boxes' ) );

/**
 * Replaces the default excerpt editor with TinyMCE.
 */
class T5_Richtext_Excerpt
{
    /**
     * Replaces the meta boxes.
     *
     * @return void
     */
    public static function switch_boxes()
    {
        if ( ! post_type_supports( $GLOBALS['post']->post_type, 'excerpt' ) )
        {
            return;
        }

        remove_meta_box(
            'postexcerpt' // ID
        ,   'post'            // Screen, empty to support all post types
        ,   'normal'      // Context
        );

        add_meta_box(
            'postexcerpt2'     // Reusing just 'postexcerpt' doesn't work.
        ,   __( 'Excerpt' )    // Title
        ,   array ( __CLASS__, 'show' ) // Display function
        ,   null              // Screen, we use all screens with meta boxes.
        ,   'normal'          // Context
        ,   'core'            // Priority
        );
    }

    /**
     * Output for the meta box.
     *
     * @param  object $post
     * @return void
     */
    public static function show( $post )
    {
    ?>
        <label class="screen-reader-text" for="excerpt"><?php
        _e( 'Excerpt' )
        ?></label>
        <?php
        // We use the default name, 'excerpt', so we don’t have to care about
        // saving, other filters etc.
        wp_editor(
            self::unescape( $post->post_excerpt ),
            'excerpt',
            array (
            'textarea_rows' => 160,   
            'media_buttons' => FALSE,
            'teeny'         => TRUE,
            'tinymce'       => array(
            'toolbar1'      => 'superscript, bold,italic,underline,separator,undo,redo',
            'toolbar2'      => '',
            'toolbar3'      => '',
        ),
            )
        );
    }
    

    /**
     * The excerpt is escaped usually. This breaks the HTML editor.
     *
     * @param  string $str
     * @return string
     */
    public static function unescape( $str )
    {
        return str_replace(
            array ( '&lt;', '&gt;', '&quot;', '&amp;', '&nbsp;', '&amp;nbsp;' )
        ,   array ( '<',    '>',    '"',      '&',     ' ', ' ' )
        ,   $str
        );
    }
}


/* styling for wordpress backend 
* hide reusable blocks tab
*/
function enqueuing_admin_scripts(){
    wp_enqueue_style('admin-your-css-file-handle-name', get_template_directory_uri().'/css/gutenberg-backend.css'); 
}
add_action( 'admin_enqueue_scripts', 'enqueuing_admin_scripts' );
