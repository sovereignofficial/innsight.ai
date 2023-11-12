import { useMutation, useQueryClient } from "@tanstack/react-query"
import Form from "~/components/forms/Form"
import { updateSettings } from "~/services/apiSettings"
import { settingsForm } from "~/utils/app.config"
import { useReduxSelector } from "~/hooks/reduxHooks"
import { useEffect } from "react"
import { initiateToast } from "~/utils/helpers"
import { useErrorHandler } from "~/hooks/useErrorHandler"
import { toastStates } from "~/types/toast.d"
import { SettingsType } from "~/types/settings.d"

const Settings:React.FC = () => {
  const { hotelSettings } = useReduxSelector(st => st.appReducer)
  const queryClient = useQueryClient();
  const { handleError } = useErrorHandler();

  const { mutate, isError: isUpdateError, error: updateError, isPending } = useMutation({
    mutationFn: (updatedSettings: Partial<SettingsType>) => updateSettings(hotelSettings?.id, updatedSettings),
    onSuccess: () => {
      initiateToast({ state: toastStates.SUCCESS, message: 'Hotel settings updated successfully.' })
      queryClient.invalidateQueries({
        queryKey: ['settingsQ']
      });
    }
  });

  const handleUpdateSettings = (updatedSettings: Partial<SettingsType>) => {
    mutate(updatedSettings);
  }

  useEffect(() => {
    if (updateError) {
      handleError(updateError)
    }
  }, [isUpdateError, updateError])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Update hotel settings</h1>
      </div>

      <div className="w-full m-auto dark:bg-secondary dark:shadow-none shadow-lg rounded-xl p-5">
        <div className="w-11/12 mx-auto">
          <Form onSubmitForm={handleUpdateSettings} initialValues={{
            minBookingLength: hotelSettings?.minBookingLength,
            maxBookingLength: hotelSettings?.maxBookingLength,
            maxGuestsPerBooking: hotelSettings?.maxGuestsPerBooking,
            breakfastPrice: hotelSettings?.breakfastPrice
          }}  >
            {settingsForm.map((form, index) => (
              <Form.FormInput key={index} {...form} />
            ))}
            <Form.FormSubmitBtn isLoading={isPending} text="Update settings" />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Settings;