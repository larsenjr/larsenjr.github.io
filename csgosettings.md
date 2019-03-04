# CSGO Settings

## launch options settings : 
```
_+exec autoexec.cfg -freq 240 -novid -tickrate 128 -panorama -language english_<br>
_Resolution: 1280x960_
```

## +---------------+
## ¦ GENERAL CVARS ¦
## +---------------+
```c++
fps_max 		    "1000"
net_graph 		    "0"
net_graphproportionalfont   "1"
net_graphpos                "150"
cl_autohelp 		    "0"
cl_showhelp 		    "0"
cl_autowepswitch	    "0"
+ cl_show_team_equipment    "1"
```
## +---------------+
## ¦ NETCODE	¦
## +---------------+
```c++
rate 			"786432"
cl_cmdrate 		"128"
cl_updaterate 		"128"
cl_interp 		"0"
cl_interp_ratio		"1"
```

## +---------------+
## ¦ Sounds		¦
## +---------------+
```c++
voice_mixer_volume 		"0.5"
snd_mixahead 			"0.025"
snd_headphone_pan_exponent 	"2"
volume 				".2"
snd_musicvolume			".2"
snd_tensecondwarning_volume	".2"
voice_scale                     "0.5"
windows_speaker_config          "1"
snd_menumusic_volume            "0"
snd_roundend_volume             "0"
snd_roundstart_volume           "0"
snd_deathcamera_volume          "0"
snd_mapobjective_volume         "0"
```

## +---------------+
## ¦ Binds	       ¦
## +---------------+
```c++
bind "kp_del" "buy defuser;"
bind "kp_ins" "buy vesthelm; buy vest;"
bind "kp_end" "buy ak47; buy m4a1;"
bind "kp_downarrow" "buy awp;"
bind "kp_pgdn" "buy mac10; buy mp9;"
bind "kp_leftarrow" "buy galilar; buy famas;"
bind "kp_5" "buy flashbang;"
bind "kp_rightarrow" "buy smokegrenade;"
bind "kp_home" "buy molotov; buy incgrenade;"
bind "kp_uparrow" "buy hegrenade;"
bind "kp_pgup" "buy tec9; buy fiveseven;"
bind "kp_plus" "buy ump45;"
bind "kp_multiply" "buy deagle;"
bind "kp_minus" "buy p250;"
bind "-" "buy sg556; buy aug;"
bind "capslock" "r_cleardecals"
bind "mouse5" "noclip"
bind "f9" "cl_righthand" "0"
bind "F10" "cl_righthand" "1"
```

## +---------------+
## ¦ Crosshair	   ¦
## +---------------+
```c++
cl_crosshair_drawoutline                    "1.000000"
cl_crosshair_dynamic_maxdist_splitratio     "0.35"
cl_crosshair_dynamic_splitalpha_innermod    "1"
cl_crosshair_dynamic_splitalpha_outermod    "0.5"
cl_crosshair_dynamic_splitdist              "7"
cl_crosshair_outlinethickness               "0.5"
cl_crosshair_sniper_show_normal_inaccuracy  "0"
cl_crosshair_sniper_width                   "1"
cl_crosshair_t                              "0.000000"
cl_crosshairalpha                           "999.000000"
cl_crosshaircolor                           "5.000000"
cl_crosshaircolor_b                         "255.000000"
cl_crosshaircolor_g                         "255.000000"
cl_crosshaircolor_r                         "255.000000"
cl_crosshairdot                             "0.000000"
cl_crosshairgap                             "-1.000000"
cl_crosshairgap_useweaponvalue              "0"
cl_crosshairscale                           "1000"
cl_crosshairsize                            "2.500000"
cl_crosshairstyle                           "4.000000"
cl_crosshairthickness                       "0.500000"
cl_crosshairusealpha                        "1"
cl_fixedcrosshairgap                        "-2.000000"
```

## +---------------+
## ¦ HUD		   ¦
## +---------------+
```c++
cl_hud_background_alpha         "0"
cl_hud_bomb_under_radar         "1"
cl_hud_color                    "5"
cl_hud_healthammo_style         "1"
cl_hud_playercount_pos          "0"
cl_hud_playercount_showcount    "1"
cl_hud_radar_scale              "1.15"
hud_scaling                     "0.95"
hud_showtargetid                "1"
cl_loadout_colorweaponnames     "0"
cl_color                        "3"
cl_showfps                      "1"
r_drawtracers_firstperson       "0"
```

## +---------------+
## ¦ VIEWMODEL	   ¦
## +---------------+
```c++
cl_viewmodel_shift_left_amt     "0.5"
cl_viewmodel_shift_right_amt    "0.25"
viewmodel_fov                   "68"
viewmodel_offset_x              "2.500000"
viewmodel_offset_y              "2"
viewmodel_offset_z              "-2"
viewmodel_presetpos             "3"
viewmodel_recoil                "0"
cl_bob_lower_amt                "7"
cl_bobamt_lat                   "0.2"
cl_bobamt_vert                  "0.15"
cl_bobcycle                     "0.98"
cl_righthand                    "1"
```

## +-----------------------+
## ¦ SENSITIVITY / MOUSE   ¦
## +-----------------------+
```c++
sensitivity                     "1.0"
m_rawinput      	        "1"
m_customaccel                   "0"
m_customaccel_exponent          "0.000100"
m_mousespeed                    "0"
m_mouseaccel1                   "0"
m_mouseaccel2                   "0"
zoom_sensitivity_ratio_mouse    "1.2"
```

## +---------------+
## ¦ ALIAS	   	   ¦
## +---------------+
```c++
alias "nades" "give weapon_hegrenade; give weapon_flashbang; give weapon_smokegrenade;give weapon_molotov;give weapon_incendiary" 
bind            "9" "nades"

bind            "F5" "+fw"
alias           "+fw" "demo_timescale 3"
alias           "-fw" "demo_timescale 1"
bind            "F6" "+fw2"
alias           "+fw2" "demo_timescale 10"
alias           "-fw2" "demo_timescale 1"
bind            "F7" "demo_togglepause"
bind            "F8" "demoui"

alias           "+jumpthrow" "+jump;-attack"
alias           "-jumpthrow" "-jump"
bind            "n" "+jumpthrow"

host_writeconfig
```