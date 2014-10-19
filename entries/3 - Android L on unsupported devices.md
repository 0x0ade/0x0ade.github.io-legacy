*WARNING: This post isn't meant as real advice to port Android L to unsupported device. It's just a quick summary of what I had to deal with.*

Owning an out-of-date Android device may be a pain. Not just because of the hardware, but also because of the availability of software updates. Older devices with worse hardware sometimes tend to profit from newer releases that push performance, but may never obtain support for such due to various factors:
- chipset manufacturer no more maintaining SOC (processor)
- driver incompatibilities with newer system versions (f.e. GPU, camera)
- manufacturer wants to push new flagship product
- too less disk space available

Sometimes, communities such as XDA, CyanogenMod or MoDaCo still push these devices to their limits, most visible with the HTC HD2. But what if nobody cares about your device? What if they tell you to compile the kernel by yourself, but your PC is too weak? What if they tell you to get yourself a custom recovery, but you've got no idea how to? Or what if there once was a way to automatically create such one, but now is no more usable ([ClockworkMod Recovery Builder](http://builder.clockworkmod.com/))?

Then you're left on your own.

[MORE] 

In such a case, you may want to operate step-by-step, summarized into three segments:
1. root your device
2. patch the stock recovery
3. port a ROM to your device

Sounds too easy? Actually, rooting your device can be acomplished by using one of the many one-click rooting utilities and patching the stock recovery isn't _that_ hard once you have got the tools. The worst part of all is the last one: Porting the ROM.

Going into detail, rooting the device even can be accomplished in case your device lacks an auto-rooting tool by just having the boot.img (from a previous OTA or dump) and patching the stock recovery requires the same knowledge as modifying a boot.img.

The boot.img consists of two main parts: The kernel, being Linux, and the ramdisk, containing the first few files loaded when you boot your device, even before the system partition gets loaded. You actually only need to modify the ramdisk. 

To root the device, you need to enable adb debugging on boot and disable all security measures on the phone, such as setting SELinux to permissive and enabling the 'adb root' command to push the su binary to a remounted system partition.

To patch the stock recovery, just take a recovery of a similar device and copy most of the files from the resource and binary folders over.

If that wasn't easy enough, let's take a look at porting the ROM. Some of the important parts that are going to be ported are:
- BOOTCLASSPATH in init.rc (or in newer versions, init.environ.rc)
- services in init.*.rc files
- apps
- frameworks
- system and app libraries and binaries
- "other files"

Stuff left as-is:
- kernel
- hardware libraries
- mount points (except you're feeling lucky)
- "other files"

Most of the time, you need **luck** or **a lot of knowledge**. Without any of the both, you are going to fail quickly, even more in case you've got an Adreno 200 GPU. Trust me, supporting it's legacy drivers is painful, hacky and nowhere stable and safe, except you're porting a custom ROM with pre-baked hacks in it.

Going to port a pure AOSP ROM, especially Android 5.0 L or higher? Have fun with missing symbols, ART, storage usage, apps killing themselves due to missing permissions, hacky GPU drivers, lag, shutting down via ADB (or pulling out the battery), no sound, no camera, no WIFI, no cellular data, no SD card access and *many, many failures* while fixing all that!

But hey, you'll at least get some battery life and an excuse as of why you are offline. *And, you'll be cool, because* **ANDROID L!**

Your best friends are going to be adb shell and logcat, recovery mode, fastboot, your USB cable and your battery. Your kitchen will consist of a plain simple bootimage spliter and bootimage repacker. If that's not enough, you need to have some disk space free for two or three ROMs and Linux.

Oh, right. Linux. It'll be profitable to boot into Linux as proper file permissions ('chmod 6777' and 'chown 0.0') and Linux-exclusive tools are needed for a proper workflow. Hopefully you won't need ODIN.

Once you get the device stuck at your favourite manufacturer's logo, it's time to find out why. Most of the time it's either a dumb permission mistake, a missing file or (in the worst case) the graphics driver. After you've fought that and 50 reboots later, a nice boot animation may show up. In case not, try again.

Then come the bootloops, or what you think they are. Patience may be profitable, especially when porting any ROM with an Android version higher than 5.0 (L). Logcat may show you in case something goes wrong, and if it goes, it also says what.

After finally getting past the boot animation ('adb shell stop bootanim' doesn't count), Android may ask you what language you prefer -it should kill your soul-... hopefully. If it doesn't, don't worry, it's just the network manager. Luckily, there's just the right library you stumbled upon when pushing stuff to your device but forgot to. Or, it's the storage manager blaming about missing folders. In the latter case, set your device's external storage to emulated in the init.rc for the meantime. After doing it, you should be greeted by a half-booted Android with many, *many* force-closes. 

Fighting the force-closes isn't that hard. Just do
        adb root
        adb shell chmod -R 777 /data/dalvik-cache/arm
... and the problem is going to be solved. It's just that the apps are trying to delete their own dalvik cache but can't as the folder permissions deny it.

After all that hard work, work is going to be even harder, but mostly splits from the default way of porting: Porting the hardware libraries and hardware dependant binaries.
- WIFI (wpa_supplicant, firmware)
- cellular data (ril)
- audio (audio and media policies)
- sensors (sensors.hwmodelhere.so)
- camera (in case you've got a really outdated device, good luck with that one!) 
- hardware keys (keylayout)

A small tip from me: Don't give up. Take breaks, but never give up. Sometimes, even months after your initial trial, you're going to face problems with more knowledge and maybe going to fix the problems more easily than before.
