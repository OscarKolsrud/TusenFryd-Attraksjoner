<x-jet-action-section>
    <x-slot name="title">
        {{ __('Slett Konto') }}
    </x-slot>

    <x-slot name="description">
        {{ __('Permanent slett kontoen din.') }}
    </x-slot>

    <x-slot name="content">
        <div class="max-w-xl text-sm text-gray-600">
            {{ __('Når kontoen din er slettet, blir alle ressursene og dataene slettet permanent. Før du sletter kontoen, må du laste ned data eller informasjon du vil beholde.') }}
        </div>

        <div class="mt-5">
            <x-jet-danger-button wire:click="confirmUserDeletion" wire:loading.attr="disabled">
                {{ __('Slett Konto') }}
            </x-jet-danger-button>
        </div>

        <!-- Delete User Confirmation Modal -->
        <x-jet-dialog-modal wire:model="confirmingUserDeletion">
            <x-slot name="title">
                {{ __('Slett Konto') }}
            </x-slot>

            <x-slot name="content">
                {{ __('Er du sikker på at du vil slette kontoen din? Når kontoen din er slettet, blir alle ressursene og dataene slettet permanent. Vennligst skriv inn passordet ditt for å bekrefte at du vil slette kontoen din permanent.') }}

                <div class="mt-4" x-data="{}" x-on:confirming-delete-user.window="setTimeout(() => $refs.password.focus(), 250)">
                    <x-jet-input type="password" class="mt-1 block w-3/4" placeholder="{{ __('Passord') }}"
                                x-ref="password"
                                wire:model.defer="password"
                                wire:keydown.enter="deleteUser" />

                    <x-jet-input-error for="password" class="mt-2" />
                </div>
            </x-slot>

            <x-slot name="footer">
                <x-jet-secondary-button wire:click="$toggle('confirmingUserDeletion')" wire:loading.attr="disabled">
                    {{ __('Glem det') }}
                </x-jet-secondary-button>

                <x-jet-danger-button class="ml-2" wire:click="deleteUser" wire:loading.attr="disabled">
                    {{ __('Slett Konto') }}
                </x-jet-danger-button>
            </x-slot>
        </x-jet-dialog-modal>
    </x-slot>
</x-jet-action-section>
